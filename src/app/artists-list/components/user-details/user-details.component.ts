import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { User } from 'src/app/models/backendModels';
import { getUserLocal } from 'src/app/services/authService';
import { EditUserDialogComponent } from 'src/app/shared/dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [DialogService]
})
export class UserDetailsComponent implements OnInit {

  constructor(public dialogService: DialogService) { }

  items!: MenuItem[];
  user: User | undefined;
  activeItem!: MenuItem;

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
        this.user = data;
      }
    })
  }
}
