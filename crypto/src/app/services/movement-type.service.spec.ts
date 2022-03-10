import { TestBed } from '@angular/core/testing';

import { MovementTypeService } from './movement-type.service';

describe('MovementTypeService', () => {
  let service: MovementTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MovementTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
