import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemDialogComponent } from './marketplace-item-dialog.component';

describe('CardViewDetailsComponent', () => {
  let component: MarketplaceItemDialogComponent;
  let fixture: ComponentFixture<MarketplaceItemDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MarketplaceItemDialogComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceItemDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
