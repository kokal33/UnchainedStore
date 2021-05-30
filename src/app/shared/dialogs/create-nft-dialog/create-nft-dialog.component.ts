import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Track } from 'ngx-audio-player';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { Auction, User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { AuctionContractService } from 'src/app/08.Contracts/Auction/auction-contract.service';
import { CreateAuctionModel } from 'src/app/06.Models/solidityModels';

@Component({
  selector: 'app-create-nft-dialog',
  templateUrl: './create-nft-dialog.component.html',
  styleUrls: ['./create-nft-dialog.component.scss'],
  providers: [MessageService, ConfirmationService, AuctionContractService],
})
export class CreateNftDialogComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;


  uploadedFiles: any[] = [];
  uploadedTrack: any;
  items!: MenuItem[];
  activeIndex: number = 0;
  uploadedTrackId: any;
  uploadedFilesSuccess = false;
  mintFilesSuccess = false;
  approveFilesSuccess = false;
  createAuctionSuccess = false;
  tokenId!: number;
  auctionTimeInDays!: number;

  user!: User | undefined;
  nftForm!: FormGroup;
  active = false;
  fileSource = "";

  // Audio player options
  msaapDisplayTitle = false;
  msaapDisplayPlayList = false;
  msaapPageSizeOptions = [2, 4, 6];
  msaapDisplayVolumeControls = false;
  msaapDisplayRepeatControls = false;
  msaapDisplayArtist = false;
  msaapDisplayDuration = false;
  msaapDisablePositionSlider = false;
  types!: any[];
  selectedType: any;
  msaapPlaylist: Track[] = [];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private sanitize: DomSanitizer,
    private backendService: BackendService,
    private auctionService: AuctionContractService

  ) { }
  ngOnInit(): void {
    this.types = [
      { name: 'Auction', code: 'NY' },
      { name: 'Marketplace', code: 'RM' },

    ];
    this.items = [{
      label: 'Details',
    },
    {
      label: 'Listing',
    },
    {
      label: 'Summary',
    }]
    this.user = getUserLocal();
    this.nftForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ownerOfPublicAddress: [this.user?.publicAddress],
      coverPhoto: [null, Validators.required],
      track: [null, Validators.required],
    });

  }
  inplaceToggle() {
    this.active = true;
  }
  getBase64(file: any) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.nftForm.get('coverPhoto')?.setValue(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  onUpload(event: { files: any }) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.getBase64(file);
    }
    this.messageService.add({
      severity: 'info',
      summary: 'File Uploaded',
      detail: '',
    });
  }
  onUploadTrack(event: { files: any }) {
    this.uploadedTrack = event.files[0];
    this.nftForm.get('track')?.setValue(this.uploadedTrack);

    this.fileSource = this.uploadedTrack;
    const audSrc = URL.createObjectURL(this.uploadedTrack);
    this.msaapPlaylist.push(
      {
        title: 'Audio One Title',
        link: <string>this.sanitize.bypassSecurityTrustUrl(audSrc),
        artist: 'Audio One Artist',
        duration: 50
      })
    this.messageService.add({
      severity: 'info',
      summary: 'Track Uploaded',
      detail: '',
    });
  }
  onEnded(event: any) {
    console.log("ended");
  }

  nextPage() {
    this.activeIndex = this.activeIndex + 1;
  }
  prevPage() {
    this.activeIndex = this.activeIndex - 1;
  }

  async mintFiles() {
    this.blockUI.start('Minting your track...'); // Start blocking
    const result = await this.backendService.mint({ trackId: this.uploadedTrackId })
    .catch(e => {
      this.blockUI.stop();
      this.messageService.add({
        severity: 'error',
        summary: 'Minting Failed!',
        detail: 'Please try again or check your wallet for errors',
      });
      return undefined;
    });
    if (!result) return;
      this.tokenId = result.body.tokenId;
      this.blockUI.stop();
      this.mintFilesSuccess = true;
  }
  async approveFiles() {
    this.blockUI.start("Your auction is being approved...")
    const approved = await this.auctionService.approveAuction(this.user?.publicAddress as string, this.tokenId)
    .catch(e => {
      this.blockUI.stop();
      this.messageService.add({
        severity: 'error',
        summary: 'Your NFT was not approved!',
        detail: e.message,
      });
      return false;
    });
    if (!approved) return;
    this.blockUI.stop();
    this.approveFilesSuccess = approved;
  }

  async createAuction(){
    this.blockUI.start("Creating auction for your NFT...")
    const model: CreateAuctionModel = {
      from: this.user?.publicAddress as string,
      startPrice: 0.01,
      tokenId: this.tokenId,
      // duration: this.auctionTimeInDays * 86400, TODO: Add duration in nft creation
      duration: 120
    };
    const auction = await this.auctionService.createAuction(model)
    .catch(e => {
      this.blockUI.stop();
      this.messageService.add({
        severity: 'error',
        summary: 'Auction creation failed!',
        detail: e.message,
      });
      this.approveFilesSuccess = false;
      return undefined;
    });
    if (!auction) return;
    // Stupid date manipulation in typescript
    const timestamp = new Date();
    timestamp.setDate(timestamp.getDate() + 1)
    console.log("TrackId: ", this.uploadedTrackId)
    const postAuctionModel: Auction = {
      started: new Date(),
      trackId: this.uploadedTrackId,
      ending: timestamp
    }
    const auctionPosting = await this.backendService.postAuction(postAuctionModel)
    .catch(e => {
      this.blockUI.stop();
      this.messageService.add({
        severity: 'error',
        summary: 'Auction creation failed!',
        detail: "The server at unchained did not respond :(, please try again or report this to the administrator",
      });
      this.approveFilesSuccess = false;
      return undefined;
    });
    if (!auctionPosting) return;
    this.blockUI.stop();
    this.createAuctionSuccess = true;
  }

  async uploadFiles() {
    if (this.nftForm.valid) {
      this.blockUI.start('Uploading your track...');
      const nft = this.nftForm.value;
      nft.coverPhoto = this.uploadedFiles[0];
      let formData: FormData = new FormData();
      formData.append('Title', nft.title);
      formData.append('Description', nft.description);
      formData.append('OwnerOfPublicAddress', this.user ? this.user.publicAddress : "");
      formData.append('CoverImage', nft.coverPhoto);
      formData.append('File', nft.track);
      const result = await this.backendService.postTrack(formData);
      if (result) {
        this.uploadedTrackId = result.body;
        this.blockUI.stop();
        this.uploadedFilesSuccess = true;
      }
    }
  }

}
