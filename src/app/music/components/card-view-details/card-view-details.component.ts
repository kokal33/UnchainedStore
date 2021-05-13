import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-card-view-details',
  templateUrl: './card-view-details.component.html',
  styleUrls: ['./card-view-details.component.scss']
})
export class CardViewDetailsComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Details', routerLink: ['nft-tab-details'] },
      { label: 'Bid History', routerLink: ['bid-history'] }
    ];

    this.activeItem = this.items[0];


  }

}
