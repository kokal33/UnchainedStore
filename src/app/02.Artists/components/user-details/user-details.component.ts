import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
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
  providers: [DialogService,BackendService]
})
export class UserDetailsComponent implements OnInit {

  constructor(public dialogService: DialogService, private activatedRoute: ActivatedRoute, private backendService: BackendService) { }

  items!: MenuItem[];
  user: User | undefined;
  activeItem!: MenuItem;
  truncateText = truncateMiddle;

  async ngOnInit() {
    const publicAddress = this.activatedRoute.snapshot.params.id;
    const userLocal = getUserLocal();
    if (publicAddress == userLocal?.publicAddress) {
      this.user = userLocal;
    } else {
      this.user =   (await this.backendService.getUserById({ publicAddress: publicAddress })).body;
    }
    this.items = [
      { label: 'Collections', routerLink: ['collections'] },
      { label: 'Created', routerLink: ['created'] },
    ];
    this.activeItem = this.items[0];
  }
  copyToClipboard(item: any) {
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e?.clipboardData?.setData('text/plain', (item));
      e.preventDefault();
    });
    document.execCommand('copy');
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
