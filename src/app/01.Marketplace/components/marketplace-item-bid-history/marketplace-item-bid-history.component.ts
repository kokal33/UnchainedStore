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
    this.bidders = [{ address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.02 BNB' }
      , { address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.05 BNB' },
    { address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.1 BNB' }]
  }

}
