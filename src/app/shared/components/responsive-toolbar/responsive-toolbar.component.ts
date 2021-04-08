import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
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
    {
      label: 'Artists',
      icon: 'library_music',
      location: 'artists',
      class: 'active',

      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },

  ];

  menuItem: MenuItem = {
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

  openWalletsModal () {
    const dialogRef = this.dialog.open(WalletDialogComponent, {
      width: '600px',
      height: '350px',
      panelClass: 'wallet-dialog',
      data: { }
    });

    dialogRef.afterClosed().subscribe(async res => {
      if (res){ await connectWallet(res); }
      return;
    });
  }
}
