import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InformacionPersonajeComponent } from './informacion-personaje.component';

describe('InformacionPersonajeComponent', () => {
  let component: InformacionPersonajeComponent;
  let fixture: ComponentFixture<InformacionPersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InformacionPersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InformacionPersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
