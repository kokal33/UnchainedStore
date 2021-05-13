import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss']
})
export class ArtistDetailsComponent implements OnInit {

  constructor() { }

  items!: MenuItem[];

  activeItem!: MenuItem;

  ngOnInit() {
    this.items = [
      { label: 'Collections', routerLink: ['nft-listings'] },
      { label: 'Created' },
    ];

    this.activeItem = this.items[0];
  }

}
