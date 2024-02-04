import { TestBed } from '@angular/core/testing';

import { FormreunionService } from '../formreunion/formreunion.service';

describe('FormreunionService', () => {
  let service: FormreunionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FormreunionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
