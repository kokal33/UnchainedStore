import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

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
  uploadedFile!: File;
  artists!: any[];
  wantsToBeArtist = false;

  constructor(private messageService: MessageService,public ref: DynamicDialogRef) {
    this.genres = [
      {name: 'Rock', code: 'NY'},
      {name: 'Techno', code: 'RM'},
      {name: 'Trance', code: 'LDN'},
      {name: 'Metal', code: 'IST'},
      {name: 'Jazz', code: 'PRS'}
  ];
  this.occupations = [
    {name: 'Disc Jockey', code: 'NY'},
    {name: 'Producer', code: 'RM'},
    {name: 'Executive', code: 'LDN'},
    {name: 'Remixer', code: 'IST'},
    {name: 'Paris', code: 'PRS'}
];
   }

  ngOnInit(): void {
  }

  showSuccess() {
  }
  myUploader(event: any) {
    this.uploadedFile = event.files[0];
    this.messageService.add({ key: 'myKey1', severity: 'success', summary: 'Success!', detail: 'Uploaded profile picture', life: 1500 });
  }
  clear() {
    this.messageService.clear();
  }
  closeDialog(){
    this.ref.close();
  }
}
