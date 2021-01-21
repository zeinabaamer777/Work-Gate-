import { TestBed } from '@angular/core/testing';

import { TablesFunctionsService } from './tables-functions.service';

describe('TablesFunctionsService', () => {
  let service: TablesFunctionsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TablesFunctionsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
