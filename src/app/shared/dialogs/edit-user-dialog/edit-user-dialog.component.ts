import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorHandlingsHelper } from 'src/app/helpers/errorHandlingHelper';
import { ArtistService } from 'src/app/services/artist.service';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  providers: [MessageService]
})
export class EditUserDialogComponent implements OnInit {
  occupations!: any[];
  selectedOccupations!: any[];
  genres!: any[];
  selectedGenres!: any[];
  customUpload = true;
  uploadedFile!: any;
  artists!: any[];
  wantsToBeArtist = false;
  userForm!: FormGroup;
  getValidationMessage = ErrorHandlingsHelper.getValidationMessage;

  constructor(private messageService: MessageService, public ref: DynamicDialogRef, private fb: FormBuilder, private artistService: ArtistService) {
    this.genres = [
      { name: 'Rock', code: 'NY' },
      { name: 'Techno', code: 'RM' },
      { name: 'Trance', code: 'LDN' },
      { name: 'Metal', code: 'IST' },
      { name: 'Jazz', code: 'PRS' }
    ];
    this.occupations = [
      { name: 'Disc Jockey', code: 'NY' },
      { name: 'Producer', code: 'RM' },
      { name: 'Executive', code: 'LDN' },
      { name: 'Remixer', code: 'IST' },
      { name: 'Paris', code: 'PRS' }
    ];
  }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      address: [""],
      isArtist: [false],
      artistName: ["", Validators.required],
      instagram: [""],
      twitter: [""],
      facebook: [""],
      image64: [null, Validators.required]
    })
  }


  submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      const userForm = this.userForm.value;
      // Address needs to be filled from local storage
      //userForm.address = this.user.publicAddress;
      // this.artistService.createOrUpdateArtist(userForm).then(result => {
      //   if (result) {
      //     this.ref.close(userForm);
      //   }
      // })

      this.ref.close(userForm);
    }
  }

  myUploader(event: any) {
    this.uploadedFile = event.files[0];
    this.getBase64(this.uploadedFile);
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Success!', detail: 'Uploaded profile picture', life: 1500 });
  }

  getBase64(file: any) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.userForm.get('image64')?.setValue(reader.result);
      console.log(reader.result);
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
  }
  clear() {
    this.messageService.clear();
  }
  closeDialog() {
    this.ref.close();
  }
}
