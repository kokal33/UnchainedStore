import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { CardViewDetailsComponent } from 'src/app/music/components/card-view-details/card-view-details.component';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss'],
  providers: [DialogService]
})
export class NftCardComponent implements OnInit {

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
    const dialog = this.dialogService.open(CardViewDetailsComponent, {
      header: '',
      data: {},

    });
    dialog.onClose.subscribe(() => {

    })
  }

  onEnded(event: any) {
    console.log("ended");
  }


}
