import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { ProductService } from 'src/app/services/productService';
import { CardViewDetailsComponent } from '../card-view-details/card-view-details.component';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  providers: [ProductService, DialogService]
})
export class CardViewComponent implements OnInit {


  fileSource = "https://rildi.sunproxy.net/file/MGpUNWxKVjVCVWE2SDB0My9EU3hlWDdBRVUrQkM0c2pqRHBVbHNZd01FRDRSajRXbmNUTDRpSitTcC91QU40MmtES1g2eUpsOEd6bzJqRnE2cm5KN0NTVnhPcTNoK3RrdGgxMnpLQ09TYkk9/The_Weeknd_-_Save_Your_Tears_(Rilds.com).mp3";

  constructor(private dialogService: DialogService) { }
  // AUDIO PLAYER CONTROLS
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = true;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = true;
  msaapDisablePositionSlider = false;

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [
    {
      title: 'Audio One Title',
      link: this.fileSource,
      artist: 'Audio One Artist',
      duration: 10
    }
  ];



  ngOnInit() {

  }

  viewDetails() {
    const dialog = this.dialogService.open(CardViewDetailsComponent, {
      width: "70%",
      header: '',
      data: {}
    });
  }

  onEnded(event: any) {
    console.log("ended");
  }


}
