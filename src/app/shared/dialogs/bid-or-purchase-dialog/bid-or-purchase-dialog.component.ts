import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {
  PostBidModel,
  SetAsSoldModel,
  User,
} from 'src/app/06.Models/backendModels';
import { BidModel, PurchaseModel } from 'src/app/06.Models/solidityModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { AuctionContractService } from 'src/app/08.Contracts/Auction/auction-contract.service';
import { MarketplaceContractService } from 'src/app/08.Contracts/Marketplace/marketplace-contract.service';

@Component({
  selector: 'app-bid-or-purchase-dialog',
  templateUrl: './bid-or-purchase-dialog.component.html',
  styleUrls: ['./bid-or-purchase-dialog.component.css'],
  providers: [MessageService, BackendService, AuctionContractService],
})
export class BidOrPurchaseDialogComponent implements OnInit {

  showProgress = false;
  bidForm!: FormGroup;
  user!: User | undefined;
  bidSuccess = false;
  isAuctioned!: boolean;
  highestBid!: number;
  constructor(
    private fb: FormBuilder,
    private backendService: BackendService,
    public config: DynamicDialogConfig,
    private auctionContractService: AuctionContractService,
    private messageService: MessageService,
    private dialogRef: DynamicDialogRef,
    private marketplaceContractService: MarketplaceContractService
  ) { }

  async ngOnInit() {
    this.bidForm = this.fb.group({
      placedBid: [null, Validators.required],
    });
    this.user = getUserLocal();
    this.isAuctioned = this.config.data.isAuctioned;
    if (!this.isAuctioned) {
      this.bidForm.get('placedBid')?.setValue(this.config.data.price);
      this.bidForm.get('placedBid')?.disable();
    }
    // This must be last because form data does not like when someone awaits before it executes
    //NEW RULE await onInit goes last
    if (this.isAuctioned) {
      this.highestBid = Number(await this.auctionContractService.getHighestBid(
        this.config.data.auctionContractAddress
      ));
      if (this.highestBid) {
        this.bidForm.get('placedBid')?.setValidators(Validators.min(((10 / 100) * this.highestBid) + this.highestBid));
        this.bidForm.get('placedBid')?.setValue((10 / 100) * this.highestBid + this.highestBid);
      } else {
        this.bidForm.get('placedBid')?.setValidators(Validators.min(((10 / 100) * this.config.data.price) + this.config.data.price));

        this.bidForm.get('placedBid')?.setValue(((10 / 100) * this.config.data.price) + this.config.data.price);

      }
    }
  }

  fixedNumber(price : number){
    return price.toFixed(2);
    }
  async purchase() {
    const listingId = this.config.data.id;
    this.showProgress = true;
    console.log(this.showProgress);
    const purchaseModel: PurchaseModel = {
      from: this.user?.publicAddress as string,
      productId: listingId,
      price: this.bidForm.get('placedBid')?.value,
    };
    const purchased = await this.marketplaceContractService
      .purchaseProduct(purchaseModel)
      .catch((e) => {
        console.log(e.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Purchase product failed, please check wallet message!',
          detail: e.message,
        });
        return undefined;
      });
    if (!purchased) return;
    const setAsSoldModel: SetAsSoldModel = {
      to: this.user?.publicAddress as string,
      trackId: this.config.data.trackId,
    };
    const markAsSold = await this.backendService
      .setTrackAsSold(setAsSoldModel)
      .catch((e) => {
        console.log(e.message);
        this.messageService.add({
          severity: 'error',
          summary:
            'Product- Mark as sold failed, please contact administrators!',
          detail: e.message,
        });
        return undefined;
      });
    if (!markAsSold) return;
    this.dialogRef.close(false);
  }

  async bid() {
    if (this.bidForm.invalid) return;
    this.showProgress = true;
    const bidModel: BidModel = {
      from: this.user?.publicAddress as string,
      amount: this.bidForm.get('placedBid')?.value,
      auctionContractAddress: this.config.data.auctionContractAddress,
    };
    // Do a bid on the blockchain auction
    const blockchainBid = await this.auctionContractService
      .bid(bidModel)
      .catch((e) => {
        console.log(e.message);
        this.messageService.add({
          severity: 'error',
          summary: 'Auction creation failed!',
          detail: e.message,
        });
        this.showProgress = false;
        return undefined;
      });
    if (!blockchainBid) return;

    const postBidModel: PostBidModel = {
      amount: this.bidForm.get('placedBid')?.value,
      bidderAddress: this.user?.publicAddress as string,
      auctionId: this.config.data.id,
    };
    // Write the bid to the backend
    const bidResult = await this.backendService.bid(postBidModel).catch((e) => {
      console.log(e.message);
      this.messageService.add({
        severity: 'error',
        summary: 'Auction creation failed!',
        detail: e.message,
      });
      this.showProgress = false;
      return undefined;
    });
    if (!bidResult) return;
    this.bidSuccess = true;
    this.dialogRef.close(true);
  }
}
