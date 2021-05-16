import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { connectWallet } from 'src/app/07.Services/providerService';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem } from 'primeng/api';
import { clearCache, getUserLocal, setUserLocal } from 'src/app/07.Services/authService';
import { truncateMiddle } from 'src/app/04.Helpers/stringHelper';
import { BackendService } from 'src/app/07.Services/backendService';
import { User } from 'src/app/06.Models/backendModels';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';


@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css'],
  providers: [BackendService, DialogService]
})
export class ResponsiveToolbarComponent implements OnInit {
  user: User | undefined;
  items!: MenuItem[];
  isWalletConnected = false;
  address!: string;
  isProduction!: boolean;

  ngOnInit() {
    this.isProduction = environment.production;
    this.user = getUserLocal();
    if (this.user) {
      this.isWalletConnected = true;
      this.address = truncateMiddle(this.user.publicAddress, 16);
    }
    this.items = [
      {
        label: 'Music',
        icon: 'pi pi-fw pi-play',
        routerLink: 'marketplace'
      },
      {
        label: 'Artists',
        icon: 'pi pi-fw pi-user',
        routerLink: 'artists'
      },
      {
        label: 'Stream',
        icon: 'pi pi-fw pi-video',
        routerLink: 'stream'
      }
    ];
    // ENVIRONMENT-CHANGE
    if (this.isProduction)
      this.items = [];
  }
  constructor(private dialog: MatDialog, private dialogService: DialogService, private backendService: BackendService, private router: Router) { }

  onClickMenuItem(event: any) {
  }

  openWalletsModal() {
    const dialogRef = this.dialogService.open(WalletDialogComponent, {
      data: {},
      styleClass:'wallet-dialog2'
    });

    dialogRef.onClose.subscribe(async (res: string) => {
      // Check for wallet connection and get signature
      const walletConnect = await connectWallet(res);
      if (!walletConnect) {
        console.log("Wallet connection unsuccessful");
        return;
      }
      // Login user with the signature provided
      try {
        const result = await this.backendService.login(walletConnect);
        setUserLocal(result.body as User);
        console.log("Login successful");
        this.isWalletConnected = true;
        this.address = truncateMiddle(walletConnect.publicAddress, 12) + " Connected";
      }
      catch (err) {
        console.log("Login unsuccessful: ", err)
        return;
      }
    });
  };

  viewProfile() {
    this.router.navigate(['/user-details']);
  }
  logout() {
    clearCache();
    this.isWalletConnected = false;
  }

}
