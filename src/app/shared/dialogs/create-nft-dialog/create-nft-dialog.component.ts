import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Track } from 'ngx-audio-player';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { AuctionModel, ListingModel, User } from '../../../06.Models/backendModels'
import { getUserLocal } from '../../../07.Services/authService';
import { BackendService } from '../../../07.Services/backendService';
import { AuctionContractService } from '../../../08.Contracts/Auction/auction-contract.service';
import { CreateAuctionModel, CreateProductModel } from '../../../06.Models/solidityModels';
import { MarketplaceContractService } from '../../../08.Contracts/Marketplace/marketplace-contract.service';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
  isAuction = false;
  createSaleSuccess = false;
  tokenId!: number;

  user!: User | undefined;
  nftForm!: FormGroup;
  active = false;
  fileSource = "";
  stateOptions!: any[];
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
  durationTypes!: any[];

  selectedType: any;
  msaapPlaylist: Track[] = [];

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private sanitize: DomSanitizer,
    private backendService: BackendService,
    private auctionService: AuctionContractService,
    private marketplaceService: MarketplaceContractService,
    public ref: DynamicDialogRef

  ) { }


  ngOnInit(): void {
    this.stateOptions = [{ label: 'Charity1', value: '1' }, { label: 'Charity2', value: '2' }, { label: 'Charity3', value: '3' }];
    this.types = [
      { id: 1, name: 'Auction', code: 'NY' },
      { id: 2, name: 'Marketplace', code: 'RM' },

    ];
    this.durationTypes = [
      { id: 1, name: 'One Day', code: 'NY' },
      { id: 2, name: 'Two Days', code: 'NY' },
      { id: 3, name: 'Three Days', code: 'NY' },
      { id: 4, name: 'Four Days', code: 'NY' },
      { id: 5, name: 'Five Days', code: 'NY' },
    ];
    this.items = [{
      label: 'Details',
    },
    {
      label: 'Listing',
    },
    {
      label: 'Charity',
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
      typeOfListing: [null, Validators.required],
      duration: [null],
      price: [0, [Validators.required, Validators.min(0.1)]],
      charityType: [null],
      charityPercent: [0],
    });

    this.nftForm.get('typeOfListing')?.valueChanges.subscribe(val => {
      console.log(val);
      if (val.id == 1) {
        this.nftForm.controls['duration'].setValidators([Validators.required]);
        this.isAuction = true;
      } else {
        this.nftForm.controls['duration'].clearValidators();
        this.isAuction = false;
      }
      this.nftForm.controls['duration'].updateValueAndValidity();
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
  onUpload(event: { files: any }, form: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
      this.getBase64(file);
      form.clear();
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
  async approve() {
    const type = this.nftForm.get('typeOfListing')?.value.id;
    if (type === 1)
      await this.approveAuction();
    if (type === 2)
      await this.approveMarketplace();
  }
  // Approve Auction
  async approveAuction() {
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
  // Approve Marketplace
  async approveMarketplace() {
    this.blockUI.start("Your NFT is being approved for listing...")
    const approved = await this.marketplaceService.approveMarketplace(this.user?.publicAddress as string, this.tokenId)
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
  // Create Auction
  async createAuction() {
    this.blockUI.start("Creating auction for your NFT...")
    const model: CreateAuctionModel = {
      from: this.user?.publicAddress as string,
      startPrice: this.nftForm.get('price')?.value,
      tokenId: this.tokenId,
      duration: this.nftForm.get('duration')?.value.id * 86400,
      // TODO: Get creator royalties from form
      creatorsRoyalties: 0,
      charityPercent: 0
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
    const ending = new Date();
    ending.setDate(ending.getUTCDate() + this.nftForm.get('duration')?.value.id)
    const started = new Date();
    started.setDate(started.getUTCDate());
    const postAuctionModel: AuctionModel = {
      started: started,
      trackId: this.uploadedTrackId,
      ending: ending,
      price: this.nftForm.get('price')?.value,
      contractAddress: auction.options.address
    }
    const auctionPosting = await this.backendService.postAuction(postAuctionModel)
      .catch(e => {
        this.blockUI.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Auction creation failed!',
          detail: "The server at unchained did not respond :( please try again or report this to the administrator",
        });
        this.approveFilesSuccess = false;
        return undefined;
      });
    if (!auctionPosting) return;
    this.blockUI.stop();
    this.createSaleSuccess = true;
  }

  // List item in the marketplace
  async listItem() {
    this.blockUI.start("Listing your NFT on the Marketplace...")
    const model: CreateProductModel = {
      from: this.user?.publicAddress as string,
      name: this.nftForm.get('title')?.value,
      price: this.nftForm.get('price')?.value,
      tokenId: this.tokenId,
      ownersRoyalty: 0,
      charityPercent: 0
    }
    const product = await this.marketplaceService.createProduct(model)
      .catch(e => {
        this.blockUI.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Listing failed!',
          detail: e.message,
        });
        return undefined;
      });
    if (!product) return;
    const listingId = product.events.ProductCreated.returnValues.id;
    const listingModel: ListingModel = {
      id: listingId,
      trackId: this.uploadedTrackId,
      price: this.nftForm.get('price')?.value
    }
    const listing = await this.backendService.postListing(listingModel)
      .catch(e => {
        this.blockUI.stop();
        this.messageService.add({
          severity: 'error',
          summary: 'Marketplace listing failed!',
          detail: "The server at unchained did not respond :( please try again or report this to the administrator",
        });
        this.createSaleSuccess = false;
        return undefined;
      });
    if (!listing) return;
    this.createSaleSuccess = true;
    this.blockUI.stop();
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
  closeDialog() {
    this.ref.close();
  }

}
