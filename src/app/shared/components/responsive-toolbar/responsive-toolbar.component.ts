import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { truncateMiddle } from 'src/app/helpers/stringHelper';
import { clearCache, setUser } from 'src/app/services/authService';
import { connectWallet } from 'src/app/services/providerService';
import { WalletDialogComponent } from '../../dialogs/wallet-dialog/wallet-dialog.component';
import { MenuItem } from '../../interfaces/menu-item';

@Component({
  selector: 'app-responsive-toolbar',
  templateUrl: './responsive-toolbar.component.html',
  styleUrls: ['./responsive-toolbar.component.css']
})
export class ResponsiveToolbarComponent implements OnInit {

  navLinks = [
    { location: 'home', label: 'Home', icon: 'menu' },
    { location: 'music', label: 'Music', icon: 'account_circle' },
    { location: 'artists', label: 'Artists', icon: 'work' }
  ];
  menuItems: MenuItem[] = [
    // {
    //   label: 'Explore music',
    //   icon: 'equalizer',
    //   location: 'music',
    //   class: 'active',
    //   showOnMobile: true,
    //   showOnTablet: true,
    //   showOnDesktop: true
    // },
    //    {
    //   label: 'Explore artists',
    //   icon: 'equalizer',
    //   location: 'all-artists',
    //   class: 'active',
    //   showOnMobile: true,
    //   showOnTablet: true,
    //   showOnDesktop: true
    // },
    // {
    //   label: 'Artists',
    //   icon: 'library_music',
    //   location: 'artists',
    //   class: 'active',

    //   showOnMobile: true,
    //   showOnTablet: true,
    //   showOnDesktop: true
    // },

  ];

  walletButton: MenuItem = {
    label: 'Connect Wallet',
    icon: 'login',
    location: 'wallet',
    class: 'active',
    showOnMobile: false,
    showOnTablet: true,
    showOnDesktop: true
  }

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  // Open modal if not connected, or logout if connected
  // TODO: Open logout dropdown if connected
  handleWalletButton() {
    if (this.walletButton.icon==='login')
       this.openWalletsModal();
    else {
        clearCache();
        this.walletButton.icon = "login"
        this.walletButton.label = "Connect Wallet"
      }
  }
  openWalletsModal () {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '600px',
      height: '300px',
      panelClass: 'wallet-dialog',
      data: { }
    });

    dialogRef.afterClosed().subscribe(async (res: string) => {
      if (res) {
        const result = await connectWallet(res);
        // If user signed the message we set the user data in localstorage and show on the toolbar
        if (result){
          setUser(result.accounts[0]);
          this.walletButton.icon = "face"
          this.walletButton.label = truncateMiddle(result.accounts[0], 16);
        }
      }
    });
  }
}
