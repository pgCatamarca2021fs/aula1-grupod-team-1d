import { TestBed } from '@angular/core/testing';

import { UltimasCotizacionesService } from './ultimas-cotizaciones.service';

describe('UltimasCotizacionesService', () => {
  let service: UltimasCotizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UltimasCotizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
