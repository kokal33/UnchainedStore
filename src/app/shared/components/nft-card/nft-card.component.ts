import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
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
  @Input() isCollection!: boolean;
  @Input() address!: string;

  myCollection: any[] = [];
  user: User | undefined;
  seconds!: number;
  environment!: any;

  constructor(private dialogService: DialogService, private backendService: BackendService) {
    this.user = getUserLocal();
  }
  async ngOnChanges(changes: SimpleChanges) {
    if (changes.isCollection.currentValue && changes.address.currentValue) {
      this.myCollection = (await this.backendService.getMyCollection({ publicAddress: changes.address.currentValue })).body;
    } else {
      this.myCollection = (await this.backendService.getMyCreated({ publicAddress: changes.address.currentValue })).body;

    }
  }
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
