import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { connectWallet } from 'src/app/services/providerService';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem } from 'primeng/api';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {


  items!: MenuItem[];


  ngOnInit() {

    this.items = [

      {
        label: 'Music',
        icon: 'pi pi-fw pi-play'
      },
      {
        label: 'Artists',
        icon: 'pi pi-fw pi-user'
      }

    ];
  }
  constructor(public dialog: MatDialog) { }



  openWalletsModal() {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '600px',
      height: '300px',
      panelClass: 'wallet-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (res: string) => {
      if (res) { await connectWallet(res); }
      return;
    });
  }
}
