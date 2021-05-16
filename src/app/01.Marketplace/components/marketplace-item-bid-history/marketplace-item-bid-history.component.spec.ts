import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemBidHistoryComponent } from './marketplace-item-bid-history.component';

describe('BidHistoryComponent', () => {
  let component: MarketplaceItemBidHistoryComponent;
  let fixture: ComponentFixture<MarketplaceItemBidHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceItemBidHistoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceItemBidHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
