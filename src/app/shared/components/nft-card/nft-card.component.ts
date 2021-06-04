import { NumberSymbol } from '@angular/common';
import { AfterViewChecked, ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Track } from 'ngx-audio-player';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { environment } from 'src/environments/environment';
import { MarketplaceItemDialogComponent } from '../../../01.Marketplace/components/marketplace-item-dialog/marketplace-item-dialog.component';

@Component({
  selector: 'app-nft-card',
  templateUrl: './nft-card.component.html',
  styleUrls: ['./nft-card.component.scss'],
  providers: [DialogService],
})
export class NftCardComponent implements OnInit {

  myCollection: any[] = [];
  user: User | undefined;
  seconds!:number;
  environment!: any;

  constructor(private dialogService: DialogService, private router: Router, private backendService: BackendService) { }

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
    this.user = getUserLocal()
    this.myCollection = (await this.backendService.getMyCollection({publicAddress: this.user?.publicAddress})).body;
  }

  viewDetails(id: number, auctionEnding: number) {
    const dialog = this.dialogService.open(MarketplaceItemDialogComponent, {
      header: '',
      data: {
        id: id,
        auctionEnding: auctionEnding
      },
    });
    dialog.onClose.subscribe(() => {

    })
  }
  onEnded(event: any) {
    console.log("ended");
  }


}
