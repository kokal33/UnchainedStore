import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { MarketplaceItemDialogComponent } from '../../../01.Marketplace/components/marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss'],
  providers: [DialogService]
})
export class NftCardComponent implements OnInit {

  fileSource = "https://filesamples.com/samples/audio/mp3/sample3.mp3";
  myCollection: any[] = [];
  user: User | undefined;

  constructor(private dialogService: DialogService, private router: Router, private backendService: BackendService) { }
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
    this.user = getUserLocal()
    this.myCollection = (await this.backendService.getMyCollection({publicAddress: this.user?.publicAddress})).body;

  }

  viewDetails() {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
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
