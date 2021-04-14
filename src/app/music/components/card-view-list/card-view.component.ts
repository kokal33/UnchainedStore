import { Component } from '@angular/core';
import { Track } from 'ngx-audio-player';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.css']
})
export class CardViewComponent {

  title = 'Card View Demo';
  gridColumns = 3;
  fileSource= "https://rildi.sunproxy.net/file/Z1Z4cEpyWi95VWtISXU2NzJqMW9meGlRZWpsZExFcTJxMFhERUFnRFZseFlEVTVhcENGRWVmTkIxeEV3Wk55RE13aUR4cDZNaWttOVlqWUFUOXVvaU45ZHo3ckUyRXFlbDE2cWxjcCtiQ3c9/Alanis_Morissette_-_Not_As_We_(Hydr0.org).mp3";

  constructor() { }

  toggleGridColumns() {
    this.gridColumns = this.gridColumns === 3 ? 4 : 3;
  }


// AUDIO PLAYER CONTROLS
msaapDisplayTitle = false;
msaapDisplayPlayList = false;
msaapPageSizeOptions = [2,4,6];
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

onEnded(event:any){
  console.log("ended");
}
}
