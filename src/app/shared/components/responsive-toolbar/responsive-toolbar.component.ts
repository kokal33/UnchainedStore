import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { connectWallet } from 'src/app/services/providerService';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem } from 'primeng/api';
import { clearCache, getUser, setUser } from 'src/app/services/authService';
import { truncateMiddle } from 'src/app/helpers/stringHelper';
import { BackendService } from 'src/app/services/backendService';
import { HttpResponse } from '@angular/common/http';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css'],
  providers: [BackendService]
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
  constructor(public dialog: MatDialog, public backendService: BackendService) { }

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
        // Check for wallet connection and get signature
        const walletConnect = await connectWallet(res);
        if (!walletConnect){
          console.log("Wallet connection unsuccessful");
          return;
        }
        // Login user with the signature provided
        try{
          const result = await this.backendService.login(walletConnect);
          console.log("Login successful");
          this.isWalletConnected = true;
          this.address = truncateMiddle(walletConnect.publicAddress, 12) + " Connected";
        }
        catch (err){
          console.log("Login unsuccessful: ", err)
          return;
        }

    });
  };

  logout() {
    clearCache();
    this.isWalletConnected = false;
  }
}
