import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { BidOrPurchaseDialogComponent } from 'src/app/shared/dialogs/bid-or-purchase-dialog/bid-or-purchase-dialog.component';

@Component({
  selector: 'app-marketplace-item-details',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.css'],
})
export class MarketplaceItemDetailsComponent implements OnInit {
  @Input() track!: any;
  seconds!: number;

  constructor(private dialogService: DialogService) { }

  async ngOnInit() {

  }
  ngOnChanges(changes: SimpleChanges) {
    if (changes.track.currentValue && changes.track.currentValue.auction) {
      const track = changes.track.currentValue;
      const startDate = new Date();
      // Do your operations
      const endDate = new Date(track.auction.ending);
      this.seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    }


  }

  placeBidOrPurchase(itemid: number, isAuctioned: boolean) {
    const dialog = this.dialogService.open(BidOrPurchaseDialogComponent, {
      header: isAuctioned ? 'Place a Bid' : 'Purchase NFT',
      data: {
        id: itemid,
        auctionContractAddress: this.track.auction?.contractAddress,
        isAuctioned: isAuctioned,
        price: this.track.auction?.price || this.track.listing?.price,
      },
      width: '30%',
    });
  }
}
