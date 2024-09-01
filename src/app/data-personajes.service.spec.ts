import { TestBed } from '@angular/core/testing';

import { DataPersonajesService } from './data-personajes.service';

describe('DataPersonajesService', () => {
  let service: DataPersonajesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataPersonajesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
