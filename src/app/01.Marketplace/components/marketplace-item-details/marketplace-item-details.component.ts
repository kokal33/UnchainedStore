import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-marketplace-item-details',
  templateUrl: './marketplace-item-details.component.html',
  styleUrls: ['./marketplace-item-details.component.css']
})
export class MarketplaceItemDetailsComponent implements OnInit {
  @Input() track!: any;

  constructor( ) { }

  async ngOnInit(){


  }

}
