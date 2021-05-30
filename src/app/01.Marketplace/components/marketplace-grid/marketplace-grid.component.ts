import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendService } from 'src/app/07.Services/backendService';
import { environment } from 'src/environments/environment';
import { MarketplaceItemDialogComponent } from '../marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-marketplace-grid',
  templateUrl: './marketplace-grid.component.html',
  styleUrls: ['./marketplace-grid.component.scss'],
  providers: [DialogService,BackendService],
})
export class MarketplaceGridComponent implements OnInit {

  marketplaceItems: any[] = [];
  environment! : any;
  constructor(private dialogService: DialogService, private backendService : BackendService,private changeDetectorRef: ChangeDetectorRef) { }
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
    this.marketplaceItems =  (await this.backendService.getTracks()).body;
  }
  viewDetails() {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
      header: '',
      data: {},
    });
  }

  onEnded(event: any) {
    console.log("ended");
  }


}
