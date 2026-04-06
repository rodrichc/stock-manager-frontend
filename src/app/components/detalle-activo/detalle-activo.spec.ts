import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleActivo } from './detalle-activo';

describe('DetalleActivo', () => {
  let component: DetalleActivo;
  let fixture: ComponentFixture<DetalleActivo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleActivo],
    }).compileComponents();

    fixture = TestBed.createComponent(DetalleActivo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
