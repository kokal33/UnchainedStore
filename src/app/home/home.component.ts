import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SubscribeDialogComponent } from '../shared/dialogs/subscribe-dialog/subscribe-dialog.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {}

  doTheThingWithTheTypeForm() {
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
