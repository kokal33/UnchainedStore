import { TestBed } from '@angular/core/testing';

import { UnchainedTokenService } from './unchained-token.service';

describe('UnchainedTokenService', () => {
  let service: UnchainedTokenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnchainedTokenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
