import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { getWalletProviders } from '../services/providerService';
import { SubscribeDialogComponent } from '../shared/dialogs/subscribe-dialog/subscribe-dialog.component';

// TypeScript

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  musicTitle!: string;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.musicTitle = "Music";
  }

  checkProviders() {
    const providers = getWalletProviders();
  }

  changeLabel() {
    //this.musicTitle = "Coming Soon";
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '900px',
      height: '850px',
      panelClass: 'subscribe-dialog',
      data: { }
    });

    dialogRef.afterClosed().subscribe(async (res: string) => {
      return;
    });
  }

}
