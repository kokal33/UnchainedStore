import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { Track } from 'ngx-audio-player';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';

@Component({
  selector: 'app-create-nft-dialog',
  templateUrl: './create-nft-dialog.component.html',
  styleUrls: ['./create-nft-dialog.component.scss'],
  providers: [MessageService],
})
export class CreateNftDialogComponent implements OnInit {
  uploadedFiles: any[] = [];
  uploadedTrack: any;
  user!: User | undefined ;
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

  // Material Style Advance Audio Player Playlist
  msaapPlaylist: Track[] = [];
  constructor(
    private messageService: MessageService,
    private fb: FormBuilder,
    private sanitize: DomSanitizer,
    private backendService : BackendService

  ) { }
  ngOnInit(): void {
    this.user = getUserLocal();
    this.nftForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ownerOfPublicAddress: [''],
      coverPhoto: [null],
      track: [null],
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

  async submit() {
    if (this.nftForm.valid) {
      const nft = this.nftForm.value;
      nft.track = this.uploadedTrack;
      nft.coverPhoto = this.uploadedFiles[0];

      let formData: FormData = new FormData();
      formData.append('Title', nft.title);
      formData.append('Description', nft.description);
      formData.append('OwnerPublicAddress', this.user ? this.user.publicAddress : "");
      formData.append('CoverPhoto', nft.coverPhoto);
      formData.append('Track', nft.track);
      const result = await this.backendService.postTrack(formData);
      console.log(result);
    }
    // return this.http.post('api/UploadFiles/UploadFiles/', formData, options).pipe(map(data => { return data; }));
  }

}
