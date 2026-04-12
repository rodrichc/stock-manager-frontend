import { Component, inject, signal } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive, Router } from '@angular/router';
import { ApiService } from './services/api';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.html'
})
export class App {
  public apiService = inject(ApiService);
  private router = inject(Router);

  // 1. Creamos el estado del menú
  isMenuOpen = signal(false);

  // 2. Función para que el botón hamburguesa lo abra/cierre
  toggleMenu() {
    this.isMenuOpen.set(!this.isMenuOpen());
  }

  // 3. Función para cerrarlo automáticamente cuando hacemos clic en un link
  cerrarMenu() {
    this.isMenuOpen.set(false);
  }

  cerrarSesion() {
    this.apiService.logout();
    this.cerrarMenu(); // Cerramos el menú por las dudas
    this.router.navigate(['/login']);
  }
}