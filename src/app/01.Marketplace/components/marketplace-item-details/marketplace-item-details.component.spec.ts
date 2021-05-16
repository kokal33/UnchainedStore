import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemDetailsComponent } from './marketplace-item-details.component';

describe('NftDetailsComponent', () => {
  let component: MarketplaceItemDetailsComponent;
  let fixture: ComponentFixture<MarketplaceItemDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceItemDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceItemDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
