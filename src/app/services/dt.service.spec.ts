import { TestBed } from '@angular/core/testing';

import { DTService } from './dt.service';

describe('DTService', () => {
  let service: DTService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DTService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
