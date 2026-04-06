import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CargarOperacion } from './cargar-operacion';

describe('CargarOperacion', () => {
  let component: CargarOperacion;
  let fixture: ComponentFixture<CargarOperacion>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CargarOperacion],
    }).compileComponents();

    fixture = TestBed.createComponent(CargarOperacion);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
