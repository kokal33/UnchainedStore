import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/backendModels';
import { getUserLocal } from 'src/app/services/authService';
import { EditUserDialogComponent } from 'src/app/shared/dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-artist-details',
  templateUrl: './artist-details.component.html',
  styleUrls: ['./artist-details.component.scss'],
  providers: [DialogService]
})
export class ArtistDetailsComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  items!: MenuItem[];
  user: User | undefined;
  activeItem!: MenuItem;
  userDetails: any;

  ngOnInit() {
    this.user = getUserLocal();
    this.items = [
      { label: 'Collections', routerLink: ['nft-listings'] },
      { label: 'Created' },
    ];
    this.activeItem = this.items[0];
  }
  viewProfile() {
    const dialogEdit = this.dialogService.open(EditUserDialogComponent, {
      width: "40%",
      header: 'Edit your profile',
      data: {}
    });
    dialogEdit.onClose.subscribe(data => {
      //use this data to refresh artist details
      if (data) {
        this.userDetails = data;
      }
    })
  }
}
