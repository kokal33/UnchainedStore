import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem, MessageService } from 'primeng/api';
import { clearCache, getUserLocal, setUserLocal } from 'src/app/07.Services/authService';
import { truncateMiddle } from 'src/app/04.Helpers/stringHelper';
import { BackendService } from 'src/app/07.Services/backendService';
import { User } from 'src/app/06.Models/backendModels';
import { DialogService } from 'primeng/dynamicdialog';
import { environment } from 'src/environments/environment';
import { ActivatedRoute, Router } from '@angular/router';
import { GoogleAnalyticsService } from 'src/app/07.Services/google-analytics.service';
import { CreateNftDialogComponent } from '../../dialogs/create-nft-dialog/create-nft-dialog.component';
import { ProviderService } from 'src/app/07.Services/provider.service';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css'],
  providers: [BackendService, DialogService]
})
export class ResponsiveToolbarComponent implements OnInit {
  user: User | undefined;
  items!: MenuItem[];
  address!: string;
  isProduction!: boolean;
  isWalletConnected!: boolean;

  ngOnInit() {
    this.isWalletConnected=false;
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
      }
    ];
    // ENVIRONMENT-CHANGE
    if (!this.user?.verified && this.isProduction)
      this.items = [];
  }
  constructor(private dialog: MatDialog, private dialogService: DialogService,
    private backendService: BackendService, private router: Router,
    private googleService: GoogleAnalyticsService, private messageService: MessageService,
    private providerService: ProviderService, private activatedRoute: ActivatedRoute) { }

  onClickMenuItem(event: any) {
  }

  openCreateNftModal() {
    const dialogRef = this.dialogService.open(CreateNftDialogComponent, {
      data: {},
      styleClass: '',
      width: '30%',
      header: 'Create your NFT'
    });
  }

  openWalletsModal() {
    const dialogRef = this.dialogService.open(WalletDialogComponent, {
      data: {},
      styleClass: 'wallet-dialog2'
    });
    this
      .googleService
      .eventEmitter("wallet", "UserIsConnectingWallet", "Wallet", this.address);

    dialogRef.onClose.subscribe(async (res: string) => {
      // Check for wallet connection and get signature
      const walletConnect = await this.providerService.connectWallet(res);
      if (!walletConnect) {
        this.messageService.add({
          severity: 'error',
          summary: 'Wallet connection failed',
          detail: '',
        });
        return;
      }
      // Login user with the signature provided
      try {
        const result = await this.backendService.login(walletConnect);
        setUserLocal(result.body as User);
        console.log("Login successful");
        this.isWalletConnected = true;
        this.address = truncateMiddle(walletConnect.publicAddress, 12) + " Connected";
        this
          .googleService
          .eventEmitter("wallet", "UserConnectedWallet", "Wallet", this.address);
        window.location.reload();
      }
      catch (err) {
        console.log("Login unsuccessful: ", err)
        return;
      }
    });
  };

  viewProfile() {
    this.router.navigate(['/user-details', this.user?.publicAddress], { relativeTo: this.activatedRoute });
  }
  logout() {
    clearCache();
    this.isWalletConnected = false;
    window.location.reload;
  }
}

if (window.ethereum){
window.ethereum.on('accountsChanged', (accounts) => {
  clearCache();
  window.location.reload();
});

window.ethereum.on('chainChanged', (chainId) => {
  clearCache();
  window.location.reload();
});
}
