import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { BackendService } from 'src/app/07.Services/backendService';
import { MarketplaceItemDialogComponent } from '../marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-marketplace-grid',
  templateUrl: './marketplace-grid.component.html',
  styleUrls: ['./marketplace-grid.component.scss'],
  providers: [DialogService,BackendService]
})
export class MarketplaceGridComponent implements OnInit {

  fileSource = "https://filesamples.com/samples/audio/mp3/sample3.mp3";
  marketplaceItems: any[] = [];
  constructor(private dialogService: DialogService, private backendService : BackendService) { }
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = true;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: this.fileSource,
      artist: 'Audio One Artist',
      duration: 50
    }
  ];

  async ngOnInit() {
    this.marketplaceItems =  (await this.backendService.getTracks()).body;
  }
  viewDetails() {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
      header: '@Oliver',
      data: {},
    });

  }

  onEnded(event: any) {
    console.log("ended");
  }


}
