import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketplaceItemIpfsDetailsComponent } from './marketplace-item-ipfs-details.component';

describe('MarketplaceItemIpfsDetailsComponent', () => {
  let component: MarketplaceItemIpfsDetailsComponent;
  let fixture: ComponentFixture<MarketplaceItemIpfsDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketplaceItemIpfsDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MarketplaceItemIpfsDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
