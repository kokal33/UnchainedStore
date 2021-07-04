import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace-item-bid-history',
  templateUrl: './marketplace-item-bid-history.component.html',
  styleUrls: ['./marketplace-item-bid-history.component.css']
})
export class MarketplaceItemBidHistoryComponent implements OnInit {
  bidders!: any[];
  @Input() track!: any;

  constructor() { }

  ngOnInit(): void {
    this.bidders = [];

    this.track?.auction?.bids.forEach((element: any) => {
      this.bidders.push({ address: element.ownerOfPublicAddress, bid: element.amount })
    });
  }

}
