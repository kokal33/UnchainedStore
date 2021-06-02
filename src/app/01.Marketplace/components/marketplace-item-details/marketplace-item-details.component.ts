import { Component, Input, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BidOrPurchaseDialogComponent } from 'src/app/shared/dialogs/bid-or-purchase-dialog/bid-or-purchase-dialog.component';

@Component({
  selector: 'app-marketplace-item-details',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.css']
})
export class MarketplaceItemDetailsComponent implements OnInit {
  @Input() track!: any;

  constructor(private dialogService: DialogService) { }

  async ngOnInit() {
  }
  placeBidOrPurchase(itemid: number, isAuctioned:boolean) {
    const dialog = this.dialogService.open(BidOrPurchaseDialogComponent, {
      header: isAuctioned ? 'Place a Bid' : 'Purchase NFT',
      data: { id: itemid, auctionContractAddress: this.track.auction.contractAddress },
      width:'30%'
    });
  }

}
