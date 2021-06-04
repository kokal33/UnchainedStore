import { Component, OnInit, ViewChild } from '@angular/core';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { CountdownComponent } from 'ngx-countdown';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendService } from 'src/app/07.Services/backendService';
import { environment } from 'src/environments/environment';
import { MarketplaceItemDialogComponent } from '../marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-marketplace-grid',
  templateUrl: './marketplace-grid.component.html',
  styleUrls: ['./marketplace-grid.component.scss'],
  providers: [DialogService, BackendService],
})
export class MarketplaceGridComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;
  seconds!: number;
  marketplaceItems: any[] = [];
  environment!: any;
  constructor(private dialogService: DialogService, private backendService: BackendService) { }
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  async ngOnInit() {
    this.environment = environment.apiUrl;
    this.blockUI.start("Loading Marketplace...");
    this.marketplaceItems = (await this.backendService.getTracks()).body;

    this.blockUI.stop();
  }
  viewDetails(id: number) {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
      header: '',
      data: { id: id },
    });
  }

  getTimeLeft(auctionEnding: string) {

    const startDate = new Date();
    // Do your operations
    const endDate = new Date(auctionEnding);
    this.seconds = (endDate.getTime() - startDate.getTime()) / 1000;
    return this.seconds;
  }

  onEnded(event: any) {
    console.log("ended");
  }


}
