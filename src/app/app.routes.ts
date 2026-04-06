import { Routes } from '@angular/router';
import { Inicio } from './components/inicio/inicio';
import { TablaActivos } from './components/tabla-activos/tabla-activos';
import { DetalleActivo } from './components/detalle-activo/detalle-activo';
import { CargarOperacion } from './components/cargar-operacion/cargar-operacion';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'activos', component: TablaActivos },
  { path: 'activo/:ticker', component: DetalleActivo },
  { path: 'cargar', component: CargarOperacion },
  { path: 'login', component: Login },
];