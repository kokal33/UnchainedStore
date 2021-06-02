import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bid-or-purchase-dialog',
  templateUrl: './bid-or-purchase-dialog.component.html',
  styleUrls: ['./bid-or-purchase-dialog.component.css']
})
export class BidOrPurchaseDialogComponent implements OnInit {
  bidSuccess = false;
  bidForm!: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.bidForm = this.fb.group({
      placedBid: [1.25, Validators.required],
    });
  }

}
