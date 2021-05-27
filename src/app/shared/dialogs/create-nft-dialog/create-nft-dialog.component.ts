import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { Track } from 'ngx-audio-player';
import { ConfirmationService, MenuItem, MessageService } from 'primeng/api';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';

@Component({
  selector: 'app-create-nft-dialog',
  templateUrl: './create-nft-dialog.component.html',
  styleUrls: ['./create-nft-dialog.component.scss'],
  providers: [MessageService, ConfirmationService],
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


  user!: User | undefined;
  nftForm!: FormGroup;
  active = false;
  fileSource = "";

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
  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [];
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private sanitize: DomSanitizer,
    private backendService: BackendService

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
      label: 'Mint',
    }, {
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
    const result = await this.backendService.mint({ trackId: this.uploadedTrackId });
    if (result) {
      this.blockUI.stop();
      this.mintFilesSuccess = true;
    }

  }
  approveFiles() {
    this.approveFilesSuccess = true;
  }

  async uploadFiles() {
    if (this.nftForm.valid) {
      this.blockUI.start('Uploading your track...'); // Start blocking
      const nft = this.nftForm.value;
      nft.coverPhoto = this.uploadedFiles[0];
      let formData: FormData = new FormData();
      formData.append('Title', nft.title);
      formData.append('Description', nft.description);
      formData.append('OwnerOfPublicAddress', this.user ? this.user.publicAddress : "");
      formData.append('CoverImage', nft.coverPhoto);
      formData.append('File', nft.track);
      const result = await this.backendService.postTrack(formData);
      this.uploadedTrackId = result.body;
      if (result) {
        this.blockUI.stop();
        this.uploadedFilesSuccess = true;

      }
    }
  }

}
