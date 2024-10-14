import { TestBed } from '@angular/core/testing';

import { EducateService } from './educate.service';

describe('EducateService', () => {
  let service: EducateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EducateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
