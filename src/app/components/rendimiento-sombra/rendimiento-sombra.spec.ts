import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RendimientoSombra } from './rendimiento-sombra';

describe('RendimientoSombra', () => {
  let component: RendimientoSombra;
  let fixture: ComponentFixture<RendimientoSombra>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RendimientoSombra],
    }).compileComponents();

    fixture = TestBed.createComponent(RendimientoSombra);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
