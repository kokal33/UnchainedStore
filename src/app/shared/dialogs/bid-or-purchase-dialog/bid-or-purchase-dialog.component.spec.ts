import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BidOrPurchaseDialogComponent } from './bid-or-purchase-dialog.component';

describe('BidOrPurchaseDialogComponent', () => {
  let component: BidOrPurchaseDialogComponent;
  let fixture: ComponentFixture<BidOrPurchaseDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BidOrPurchaseDialogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BidOrPurchaseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
