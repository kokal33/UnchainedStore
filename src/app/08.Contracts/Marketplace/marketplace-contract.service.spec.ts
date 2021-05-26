import { TestBed } from '@angular/core/testing';

import { MarketplaceContractService } from './marketplace-contract.service';

describe('MarketplaceContractService', () => {
  let service: MarketplaceContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MarketplaceContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
