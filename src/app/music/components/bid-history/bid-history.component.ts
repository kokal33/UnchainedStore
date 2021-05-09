import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bid-history',
  templateUrl: './bid-history.component.html',
  styleUrls: ['./bid-history.component.css']
})
export class BidHistoryComponent implements OnInit {
  bidders!: any[];

  constructor() { }

  ngOnInit(): void {
    this.bidders = [{ address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.02 BNB' }
      , { address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.05 BNB' },
    { address: '1HB5XMLmzFVj8ALj6mfBsbifRoD4miY36v', bid: '0.1 BNB' }]
  }

}
