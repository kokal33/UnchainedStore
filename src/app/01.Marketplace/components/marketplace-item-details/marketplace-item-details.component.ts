import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { GetJsonRpcError } from 'src/app/04.Helpers/stringHelper';
import { SetAsSoldModel, User } from 'src/app/06.Models/backendModels';
import { EndAuctionModel } from 'src/app/06.Models/solidityModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { AuctionContractService } from 'src/app/08.Contracts/Auction/auction-contract.service';
import { BidOrPurchaseDialogComponent } from 'src/app/shared/dialogs/bid-or-purchase-dialog/bid-or-purchase-dialog.component';

@Component({
  selector: 'app-marketplace-item-details',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.css'],
  providers: [MessageService, AuctionContractService],
})
export class MarketplaceItemDetailsComponent implements OnInit {
  @Input() track!: any;
  @Output() bidSuccess = new EventEmitter<boolean>();
  user?: User;
  constructor(private messageService: MessageService,
    private dialogService: DialogService,
    private backendService: BackendService,
    private auctionContractService: AuctionContractService,
  ) { }

  async ngOnInit() {
    this.user = getUserLocal();
  }

  placeBidOrPurchase(itemid: number, isAuctioned: boolean) {
    const dialog = this.dialogService.open(BidOrPurchaseDialogComponent, {
      header: isAuctioned ? 'Place a Bid' : 'Purchase NFT',
      data: {
        id: itemid,
        auctionContractAddress: this.track.auction?.contractAddress,
        isAuctioned: isAuctioned,
        price: this.track.auction?.price || this.track.listing?.price,
        trackId: this.track.id,
      },
      width: '30%',
    });
    dialog.onClose.subscribe(success => {
      if (success) {
        this.messageService.add({ severity: 'success', summary: 'Sucess!', detail: '' });
        this.bidSuccess.emit(success);
      }
    })
  }


  async endAuction() {
    const endAuctionModel: EndAuctionModel = {
      //Todo: if owner of auction, then finalize
      from: this.user?.publicAddress as string,
      auctionContractAddress: this.track.auction?.contractAddress,
    }
    const endAuction = await this.auctionContractService.auctionEnd(endAuctionModel)
      .catch((e) => {
        var rpcError = GetJsonRpcError(e);
        this.messageService.add({
          severity: 'error',
          summary: 'End auction failed, check your wallet for errors',
          detail: rpcError.message,
        });
        if (rpcError.message === "execution reverted: No bids for this auction") {
          this.backendService.SetNoBidsFinishedAuction({ id: this.track.id });
          window.location.reload();
        }
        return undefined;
      });
    if (!endAuction) return;
    const highestBidder = await endAuction.events.AuctionEnded.returnValues.winner;
    console.log("SOLD TO THE HIGHEST BIDDER: ", highestBidder);

    // Mark Track as sold to the highest bidder
    const setAsSoldModel: SetAsSoldModel = {
      to: highestBidder,
      trackId: this.track.id
    };
    const markAsSold = await this.backendService
      .setTrackAsSold(setAsSoldModel)
      .catch((e) => {
        console.log(e.message);
        this.messageService.add({
          severity: 'error',
          summary:
            'End auction- ending auction failed, please contact administrators!',
          detail: e.message,
        });
        return undefined;
      });
    if (!markAsSold) return;
  }
}
