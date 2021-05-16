import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorHandlingsHelper } from 'src/app/helpers/errorHandlingHelper';
import { User } from 'src/app/models/backendModels';
import { getUserLocal, setUserLocal } from 'src/app/services/authService';
import { BackendService } from 'src/app/services/backendService';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.css'],
  providers: [MessageService, BackendService]
})
export class EditUserDialogComponent implements OnInit {
  occupations!: any[];
  genres!: any[];
  customUpload = true;
  uploadedFile!: any;
  artists!: any[];
  wantsToBeArtist = false;
  userForm!: FormGroup;
  user: User | undefined;
  getValidationMessage = ErrorHandlingsHelper.getValidationMessage;

  constructor(private messageService: MessageService, public ref: DynamicDialogRef, private fb: FormBuilder, private backendService: BackendService) {
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
      publicAddress: [""],
      bio: [""],
      isArtist: [false],
      name: ["", Validators.required],
      instagram: [""],
      twitter: [""],
      facebook: [""],
      profilePic: [null, Validators.required]
      // occupations: [null, Validators.required],
      // genres: [null, Validators.required]
    })
    this.user = getUserLocal();
    // If user exists pre-populate form
    if (this.user)
      this.userForm.patchValue(this.user);
  }


  async submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      // Convert form into user model
      const userForm: User = this.userForm.getRawValue();
      const userUpdate = await this.backendService.updateUser(userForm);
      if (userUpdate.status == 200){
        //TODO: if not 200 show some message, also on success
      setUserLocal(userForm);
      }

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
      me.userForm.get('profilePic')?.setValue(reader.result);
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
