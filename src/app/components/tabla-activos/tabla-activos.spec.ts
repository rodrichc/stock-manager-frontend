import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaActivos } from './tabla-activos';

describe('TablaActivos', () => {
  let component: TablaActivos;
  let fixture: ComponentFixture<TablaActivos>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablaActivos],
    }).compileComponents();

    fixture = TestBed.createComponent(TablaActivos);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
