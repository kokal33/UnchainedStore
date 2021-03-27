import { Component, OnInit } from '@angular/core';
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
    {
      label: 'Connect Wallet',
      icon: 'login',
      showOnMobile: true,
      showOnTablet: true,
      showOnDesktop: true
    },
    // {
    //   label: 'About',
    //   icon: 'help',
    //   showOnMobile: false,
    //   showOnTablet: true,
    //   showOnDesktop: true
    // },
    // {
    //   label: 'Pricing',
    //   icon: 'attach_money',
    //   showOnMobile: false,
    //   showOnTablet: false,
    //   showOnDesktop: true
    // },
    // {
    //   label: 'Docs',
    //   icon: 'notes',
    //   showOnMobile: false,
    //   showOnTablet: true,
    //   showOnDesktop: true
    // },
    // {
    //   label: 'Showcase',
    //   icon: 'slideshow',
    //   showOnMobile: false,
    //   showOnTablet: false,
    //   showOnDesktop: true
    // },
    // {
    //   label: 'Blog',
    //   icon: 'rss_feed',
    //   showOnMobile: false,
    //   showOnTablet: false,
    //   showOnDesktop: false
    // },
  ];

  constructor() { }

  ngOnInit(): void {
  }


}
