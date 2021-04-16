import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { connectWallet } from 'src/app/services/providerService';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem } from 'primeng/api';
import { clearCache, getUser, setUser } from 'src/app/services/authService';
import { truncateMiddle } from 'src/app/helpers/stringHelper';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {

  items!: MenuItem[];
  isWalletConnected = false;
  address!: string;

  ngOnInit() {
    const address = getUser();
    if (address) {
      this.isWalletConnected = true;
      this.address = truncateMiddle(address, 16);
    }
    this.items = [
      {
        label: 'Music',
        icon: 'pi pi-fw pi-play',
        routerLink: 'music'
      },
      {
        label: 'Artists',
        icon: 'pi pi-fw pi-user',
        routerLink: 'all-artists'
      }
    ];
  }
  constructor(public dialog: MatDialog) { }

  onClickMenuItem(event: any) {
    console.log(event);
  }

  openWalletsModal() {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '600px',
      height: '300px',
      panelClass: 'wallet-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (res: string) => {
      if (res) {
        const result = await connectWallet(res);
        // If user signed the message we set the user data in localstorage and show on the toolbar
        if (result) {
          setUser(result.accounts[0]);
          this.isWalletConnected = true;
          this.address = truncateMiddle(result.accounts[0], 12) + " Connected";
        }
      }
    });
  }

  logout() {
    clearCache();
    this.isWalletConnected = false;
  }

}
