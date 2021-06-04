import {  Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
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
  @Output() bidSuccess = new EventEmitter<boolean>();

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
        trackId: this.track.id,
      },
      width: '30%',
    });
    dialog.onClose.subscribe(success => {
      if (success) {
        this.bidSuccess.emit(success);
      }
    })
  }

}
