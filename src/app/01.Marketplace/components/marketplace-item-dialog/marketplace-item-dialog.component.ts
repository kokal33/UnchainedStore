import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { IdModel } from 'src/app/06.Models/idModel';
import { BackendService } from 'src/app/07.Services/backendService';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-marketplace-item-dialog',
  templateUrl: './marketplace-item-dialog.component.html',
  styleUrls: ['./marketplace-item-dialog.component.scss'],
  providers: [BackendService]
})
export class MarketplaceItemDialogComponent implements OnInit {
  items!: MenuItem[];
  activeItem!: MenuItem;
  track: any;
  environment: any;
  constructor(public config: DynamicDialogConfig, private backendService: BackendService) { }

  async ngOnInit(): Promise<void> {
    this.environment = environment.apiUrl;
    const model: IdModel = {
      id: this.config.data.id
    }
    const result = await this.backendService.getTrackById(model);
    this.track = result.body;
    this.items = [
      {
        id: "1", label: 'Details', command: (event) => {
          this.activeItem = this.items[0];
        }
      },
      {
        id: "2", visible: this.track?.auction?.bids.length > 0, label: 'Bid History', command: (event) => {
          this.activeItem = this.items[1];
        }
      },
      {
        id: "3", label: 'IPFS Metadata', command: (event) => {
          this.activeItem = this.items[2];
        }
      }
    ];
    this.activeItem = this.items[0];

  }

  //Event received from bid-or-purchase-dialog Component, through marketplace-item-details
  //Summary: bid-or-purchase-dialog on close sends success, marketplace-item-details receives and emits event to here
  // This is so we know if the bid is success and the dialog is closed, we should refresh to get the highest bid
  async onBidSuccess(success: boolean) {
    if (!success) return;
    const result = await this.backendService.getTrackById({ id: this.config.data.id });
    this.track = result.body;
  }

}
