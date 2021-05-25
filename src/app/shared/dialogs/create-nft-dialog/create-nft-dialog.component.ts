import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';

@Component({
  selector: 'app-create-nft-dialog',
  templateUrl: './create-nft-dialog.component.html',
  styleUrls: ['./create-nft-dialog.component.scss'],
  providers: [MessageService],
})
export class CreateNftDialogComponent implements OnInit {
  uploadedFiles: any[] = [];
  user!: User | undefined;
  nftForm!: FormGroup;
  active = false;

  constructor(
    private messageService: MessageService,
    private fb: FormBuilder
  ) {}
  ngOnInit(): void {
    this.user = getUserLocal();
    this.nftForm = this.fb.group({
      id: [null],
      title: ['', Validators.required],
      description: ['', Validators.required],
      ownerOfPublicAddress: [false],
      coverPhoto: [null],
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
      console.log(reader.result);
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
}
