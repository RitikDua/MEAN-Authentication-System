import { TestBed } from '@angular/core/testing';

import { TokenInterceptService } from './token-intercept.service';

describe('TokenInterceptService', () => {
  let service: TokenInterceptService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TokenInterceptService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
