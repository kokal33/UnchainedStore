import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import { GoogleAnalyticsService } from '../07.Services/google-analytics.service';
import { SubscribeDialogComponent } from '../shared/dialogs/subscribe-dialog/subscribe-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  safeURL: any;

  constructor(public dialog: MatDialog, public domSanitizer: DomSanitizer, private googleService: GoogleAnalyticsService) {
    this.safeURL = this.domSanitizer.bypassSecurityTrustResourceUrl("https://www.youtube.com/embed/7oLBeMGDOJg");
  }

  ngOnInit(): void { }

  doTheThingWithTheTypeForm() {
    this
      .googleService
      .eventEmitter("register_form", "UserClickedRegister", "Typeform", "");
    const dialogRef = this.dialog.open(SubscribeDialogComponent, {
      width: '900px',
      height: '850px',
      panelClass: 'subscribe-dialog',
      data: {}
    });

    dialogRef.afterClosed().subscribe(async (res: string) => {
      return;
    });
  }

}
