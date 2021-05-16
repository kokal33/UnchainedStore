import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { MarketplaceItemDialogComponent } from '../marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-marketplace-grid',
  templateUrl: './marketplace-grid.component.html',
  styleUrls: ['./marketplace-grid.component.scss'],
  providers: [DialogService]
})
export class MarketplaceGridComponent implements OnInit {

  fileSource = "https://filesamples.com/samples/audio/mp3/sample3.mp3";

  constructor(private dialogService: DialogService, private router: Router) { }
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



  ngOnInit() {

  }
  viewDetails() {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
      header: '',
      data: {},
    });
    dialog.onClose.subscribe(() => {
    //  this.router.navigate(['/marketplace'])

    })
  }

  onEnded(event: any) {
    console.log("ended");
  }


}
