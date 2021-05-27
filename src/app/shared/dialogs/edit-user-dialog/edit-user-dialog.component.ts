import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MenuItem, MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { ErrorHandlingsHelper } from 'src/app/04.Helpers/errorHandlingHelper';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal, setUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';

@Component({
  selector: 'app-edit-user-dialog',
  templateUrl: './edit-user-dialog.component.html',
  styleUrls: ['./edit-user-dialog.component.scss'],
  providers: [MessageService, BackendService]
})
export class EditUserDialogComponent implements OnInit {
  customUpload = true;
  uploadedFile!: any[];
  wantsToBeArtist = false;
  items!: MenuItem[];
  activeIndex: number = 0;
  userForm!: FormGroup;
  user: User | undefined;
  getValidationMessage = ErrorHandlingsHelper.getValidationMessage;

  constructor(private messageService: MessageService, public ref: DynamicDialogRef, private fb: FormBuilder, private backendService: BackendService) {
  }

  ngOnInit(): void {
    this.uploadedFile = [];
    this.items = [{
      label: 'Profile Picture',
    },
    {
      label: 'Personal',
    },
    {
      label: 'Social Media',
    }
    ];
    this.userForm = this.fb.group({
      publicAddress: [""],
      bio: ["", Validators.required],
      isArtist: [false],
      name: ["", Validators.required],
      instagram: [""],
      twitter: [""],
      facebook: [""],
      profilePic: [null, Validators.required]
    })
    this.user = getUserLocal();
    // If user exists pre-populate form
    if (this.user)
      this.userForm.patchValue(this.user);
  }

  nextPage() {
    this.activeIndex = this.activeIndex + 1;
  }
  prevPage() {
    this.activeIndex = this.activeIndex - 1;
  }
  async submit() {
    if (this.userForm.invalid) {
      this.userForm.markAllAsTouched();
    } else {
      // Convert form into user model
      const userForm: User = this.userForm.getRawValue();
      const userUpdate = await this.backendService.updateUser(userForm);
      if (userUpdate.status == 200) {
        //TODO: if not 200 show some message, also on success
        setUserLocal(userForm);
      }

      this.ref.close(userForm);
    }
  }

  myUploader(event: any) {
    this.uploadedFile = event.files[0];
    this.getBase64(this.uploadedFile);
    this.uploadedFile = [];
    event.files = [];
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Success!', detail: 'Uploaded profile picture', life: 1500 });
  }



  getBase64(file: any) {
    let me = this;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      me.userForm.get('profilePic')?.setValue(reader.result);
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
