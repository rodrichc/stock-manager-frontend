import { Component, inject, OnInit, signal } from '@angular/core';
import { ApiService } from '../../service/api';
import { TablaActivos } from '../tabla-activos/tabla-activos';
import { GraficoEvolucion } from '../grafico-evolucion/grafico-evolucion';
import { RendimientoSombra } from '../rendimiento-sombra/rendimiento-sombra';
import { Grafico } from '../../grafico/grafico';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [TablaActivos, GraficoEvolucion, RendimientoSombra, Grafico],
  templateUrl: './inicio.html', 
  styleUrls: ['./inicio.css']   
})
export class Inicio implements OnInit { 
  private apiService = inject(ApiService);
  
  resumenData = signal<any>(null);

  ngOnInit() {
    this.apiService.getResumen().subscribe({
      next: (datos) => this.resumenData.set(datos),
      error: (error) => console.error('Error:', error)
    });
  }

  // Signals para manejar la calculadora TWR
  resultadoTwr = signal<any>(null);
  errorCalculo = signal<string>('');

  // Esta función se va a ejecutar cuando hagamos clic en el botón del HTML
  calcularRendimiento(fechaInicio: string, fechaFin: string) {
    // Validación básica
    if (!fechaInicio || !fechaFin) {
      this.errorCalculo.set('Por favor, seleccioná ambas fechas.');
      return;
    }
    
    // Limpiamos errores previos
    this.errorCalculo.set('');

    // Llamamos al backend
    this.apiService.getRendimientoTwr(fechaInicio, fechaFin).subscribe({
      next: (datos) => {
        this.resultadoTwr.set(datos); // Guardamos la respuesta de Django
      },
      error: (err) => {
        console.error(err);
        this.errorCalculo.set('Hubo un error al calcular el rendimiento.');
      }
    });
  }
}
