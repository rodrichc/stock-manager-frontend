import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../services/api';
import { CurrencyPipe, PercentPipe } from '@angular/common'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-tabla-activos',
  standalone: true,
  imports: [CurrencyPipe, PercentPipe, RouterLink], 
  templateUrl: './tabla-activos.html',
  styleUrls: ['./tabla-activos.css']
})
export class TablaActivos implements OnInit {
  private apiService = inject(ApiService);
  
  listaActivos = signal<any[]>([]);

  // 1. Agregamos las variables de control
  columnaActual = '';
  ordenAscendente = true;

  ngOnInit() {
    this.apiService.getDetalle().subscribe({
      next: (datos) => this.listaActivos.set(datos),
      error: (err) => console.error('Error cargando activos:', err)
    });
  }

  // 2. Agregamos la función que hace la magia de reordenar
  ordenarTabla(columna: string) {
    if (this.columnaActual === columna) {
      this.ordenAscendente = !this.ordenAscendente;
    } else {
      this.columnaActual = columna;
      this.ordenAscendente = true;
    }

    this.listaActivos.update((activosActuales) => {
      return [...activosActuales].sort((a, b) => {
        let valorA = a[columna];
        let valorB = b[columna];

        if (typeof valorA === 'string') valorA = valorA.toLowerCase();
        if (typeof valorB === 'string') valorB = valorB.toLowerCase();

        if (valorA < valorB) {
          return this.ordenAscendente ? -1 : 1;
        }
        if (valorA > valorB) {
          return this.ordenAscendente ? 1 : -1;
        }
        return 0;
      });
    });
  }
}