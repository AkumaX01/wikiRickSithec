import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ThemeBotonComponent } from './theme-boton.component';

describe('ThemeBotonComponent', () => {
  let component: ThemeBotonComponent;
  let fixture: ComponentFixture<ThemeBotonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ThemeBotonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ThemeBotonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
