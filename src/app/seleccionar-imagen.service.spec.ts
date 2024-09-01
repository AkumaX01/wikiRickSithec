import { TestBed } from '@angular/core/testing';

import { SeleccionarImagenService } from './seleccionar-imagen.service';

describe('SeleccionarImagenService', () => {
  let service: SeleccionarImagenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeleccionarImagenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
