import { Component, OnInit } from '@angular/core';
import { Track } from 'ngx-audio-player';
import { SelectItem } from 'primeng/api';
import { Product } from 'src/app/domain/product';
import { ProductService } from 'src/app/services/productService';

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html',
  styleUrls: ['./card-view.component.scss'],
  providers: [ProductService]
})
export class CardViewComponent implements OnInit {

  products!: Product[];

  sortOptions!: SelectItem[];

  sortOrder!: number;

  sortField!: string;
  sortKey: any;

  fileSource = "https://rildi.sunproxy.net/file/Z1Z4cEpyWi95VWtISXU2NzJqMW9meGlRZWpsZExFcTJxMFhERUFnRFZseFlEVTVhcENGRWVmTkIxeEV3Wk55RE13aUR4cDZNaWttOVlqWUFUOXVvaU45ZHo3ckUyRXFlbDE2cWxjcCtiQ3c9/Alanis_Morissette_-_Not_As_We_(Hydr0.org).mp3";

  constructor(private productService: ProductService) { }




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
    this.productService.getProducts().then(data => this.products = data);
   console.log(this.products);
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
    ];
  }

  onEnded(event: any) {
    console.log("ended");
  }


  onSortChange(event: any) {
    let value = event.value;

    if (value.indexOf('!') === 0) {
      this.sortOrder = -1;
      this.sortField = value.substring(1, value.length);
    }
    else {
      this.sortOrder = 1;
      this.sortField = value;
    }
  }
}
