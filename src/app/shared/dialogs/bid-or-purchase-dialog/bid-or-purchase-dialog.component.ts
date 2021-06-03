import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MessageService } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { PostBidModel, User } from 'src/app/06.Models/backendModels';
import { BidModel } from 'src/app/06.Models/solidityModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { AuctionContractService } from 'src/app/08.Contracts/Auction/auction-contract.service';

@Component({
  selector: 'app-bid-or-purchase-dialog',
  templateUrl: './bid-or-purchase-dialog.component.html',
  styleUrls: ['./bid-or-purchase-dialog.component.css'],
  providers:[BackendService, AuctionContractService]
})
export class BidOrPurchaseDialogComponent implements OnInit {

  showProgress = false;
  bidForm!: FormGroup;
  user!: User | undefined;
  isAuctioned! : boolean;

  constructor(private fb: FormBuilder, private backendService: BackendService, public config: DynamicDialogConfig,
              private auctionContractService: AuctionContractService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      placedBid: [null, Validators.required],
    });
    this.user = getUserLocal();
    this.isAuctioned = this.config.data.isAuctioned;
    if (!this.isAuctioned) {
      this.bidForm.get('placedBid')?.setValue(this.config.data.price);
      this.bidForm.get('placedBid')?.disable();
    }
  }

  async purchase(){
  this.showProgress = true;
  }
  async bid() {
     if(this.bidForm.invalid) return;
    this.showProgress = true;
     const bidModel: BidModel = {
      from: this.user?.publicAddress as string,
      amount: this.bidForm.get('placedBid')?.value,
      auctionContractAddress: this.config.data.auctionContractAddress
     }
     const blockchainBid = await this.auctionContractService.bid(bidModel)
     .catch(e => {
       console.log(e.message);
      this.messageService.add({
        severity: 'error',
        summary: 'Auction creation failed!',
        detail: e.message,
      });
      return undefined;
    });
  if (!blockchainBid) return;

    const postBidModel: PostBidModel = {
      amount: this.bidForm.get('placedBid')?.value,
      bidderAddress: this.user?.publicAddress as string,
      auctionId: this.config.data.id
    }
    const bidResult = await this.backendService.bid(postBidModel)
    .catch(e => {
      console.log(e.message);
     this.messageService.add({
       severity: 'error',
       summary: 'Auction creation failed!',
       detail: e.message,
     });
     return undefined;
   });
   if (!bidResult) return;
  }


}
