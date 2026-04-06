import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../service/api';
import { CurrencyPipe } from '@angular/common'; // Para formatear los dólares

@Component({
  selector: 'app-rendimiento-sombra',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './rendimiento-sombra.html'
})
export class RendimientoSombra implements OnInit {
  private apiService = inject(ApiService);

  // Signal para guardar el JSON que armaste en Django
  comparativaSpy = signal<any>(null);

  ngOnInit() {
    this.cargarComparativa();
  }

  cargarComparativa() {
    this.apiService.getRendimientoSombra().subscribe({
      next: (datos) => this.comparativaSpy.set(datos),
      error: (err) => console.error('Error trayendo la sombra del SPY:', err)
    });
  }
}