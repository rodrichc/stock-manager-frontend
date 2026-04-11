import { Routes } from '@angular/router';
import { authGuard } from './auth-guard';
import { Inicio } from './components/inicio/inicio';
import { TablaActivos } from './components/tabla-activos/tabla-activos';
import { DetalleActivo } from './components/detalle-activo/detalle-activo';
import { CargarOperacion } from './components/cargar-operacion/cargar-operacion';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: 'inicio', pathMatch: 'full' },

  { path: 'inicio', component: Inicio, canActivate: [authGuard] },
  { path: 'activos', component: TablaActivos, canActivate: [authGuard] },
  { path: 'activo/:ticker', component: DetalleActivo, canActivate: [authGuard] },
  { path: 'cargar', component: CargarOperacion, canActivate: [authGuard] },

  { path: 'login', component: Login },

  { path: '**', redirectTo: 'inicio' }
];