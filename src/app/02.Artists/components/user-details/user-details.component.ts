import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BlockUI, NgBlockUI } from 'ng-block-ui';
import { MenuItem } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { truncateMiddle } from 'src/app/04.Helpers/stringHelper';
import { User } from 'src/app/06.Models/backendModels';
import { getUserLocal } from 'src/app/07.Services/authService';
import { BackendService } from 'src/app/07.Services/backendService';
import { EditUserDialogComponent } from 'src/app/shared/dialogs/edit-user-dialog/edit-user-dialog.component';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
  providers: [DialogService, BackendService]
})
export class UserDetailsComponent implements OnInit {
  @BlockUI() blockUI!: NgBlockUI;

  constructor(public dialogService: DialogService, private activatedRoute: ActivatedRoute, private backendService: BackendService) { }

  items!: MenuItem[];
  user: User | undefined;
  activeItem!: MenuItem;
  truncateText = truncateMiddle;
  isLocalUser = false;

  async ngOnInit() {
    this.blockUI.start();
    const publicAddress = this.activatedRoute.snapshot.params.id;
    const userLocal = getUserLocal();
    if (publicAddress == userLocal?.publicAddress) {
      this.user = userLocal;
      this.isLocalUser = true;
    } else {
      this.user = (await this.backendService.getUserById({ publicAddress: publicAddress })).body;
    }
    this.items = [
      { label: 'Collections', routerLink: ['collections'] },
      { label: 'Created', routerLink: ['created'] },
    ];
    this.activeItem = this.items[0];
    this.blockUI.stop();

  }
  copyToClipboard(item: any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e?.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
    });
    document.execCommand('copy');
  }
  editProfile() {
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
