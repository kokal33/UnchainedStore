import { TestBed } from '@angular/core/testing';

import { AuctionContractService } from './auction-contract.service';

describe('AuctionContractService', () => {
  let service: AuctionContractService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuctionContractService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
