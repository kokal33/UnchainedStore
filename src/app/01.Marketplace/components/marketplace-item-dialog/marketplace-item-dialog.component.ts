import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-marketplace-item-dialog',
  templateUrl: './marketplace-item-dialog.component.html',
  styleUrls: ['./marketplace-item-dialog.component.scss']
})
export class MarketplaceItemDialogComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;
  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.items = [
      { label: 'Details', routerLink: ['nft-details'] },
      { label: 'Bid History', routerLink: ['bid-history'] }
    ];

    this.activeItem = this.items[0];

    this.router.navigate(['nft-details'], { relativeTo: this.route });

  }

}
