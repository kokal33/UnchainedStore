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
    this.items = [
      {
        id: "1", label: 'Details', command: (event) => {
          this.activeItem = this.items[0];
        }
      },
      {
        id: "2", label: 'Bid History', command: (event) => {
          this.activeItem = this.items[1];
        }
      }
    ];
    this.activeItem = this.items[0];
    const nftId = this.config.data.id;
    const model = {} as IdModel;
    model.id = nftId;
    const result = await this.backendService.getTrackById(model);
    this.track = result.body;
  }

}
