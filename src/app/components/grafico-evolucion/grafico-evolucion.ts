import { Component, inject, OnInit } from '@angular/core';
import { ApiService } from '../../service/api';
// 1. Importamos todo lo necesario de Chart.js
import { Chart, registerables } from 'chart.js'; 

// 2. Registramos las herramientas del gráfico (líneas, colores, ejes)
Chart.register(...registerables); 

@Component({
  selector: 'app-grafico-evolucion',
  standalone: true,
  templateUrl: './grafico-evolucion.html',
  styleUrls: ['./grafico-evolucion.css']
})
export class GraficoEvolucion implements OnInit {
  private apiService = inject(ApiService);
  public chart: any; // Acá vamos a guardar nuestro gráfico

  ngOnInit() {
    this.apiService.getEvolucion().subscribe({
      next: (datos) => {
        // 3. Cuando llegan los datos, extraemos lo que necesitamos para los ejes
        // .map() recorre la lista de Django y extrae solo ese dato específico
        const fechas = datos.map(d => d.fecha);
        const invertido = datos.map(d => d.invertido);
        const valorActual = datos.map(d => d.valor_actual);

        // 4. Llamamos a la función para dibujar pasándole los datos limpios
        this.crearGrafico(fechas, invertido, valorActual);
      },
      error: (err) => console.error('Error cargando evolución:', err)
    });
  }

  crearGrafico(fechas: string[], invertido: number[], valorActual: number[]) {
    this.chart = new Chart('canvasEvolucion', {
      type: 'line', // Tipo de gráfico: Líneas
      data: {
        labels: fechas, // El eje X (las fechas abajo)
        datasets: [
          {
            label: 'Puesto del Bolsillo (USD)',
            data: invertido,
            borderColor: '#6c757d', // Color gris para tu plata
            backgroundColor: 'rgba(108, 117, 125, 0.2)',
            borderWidth: 2,
            tension: 0.3 // Hace que la línea sea curvita y suave
          },
          {
            label: 'Valor Actual (USD)',
            data: valorActual,
            borderColor: '#0d6efd', // Color azul vibrante para el valor real
            backgroundColor: 'rgba(13, 110, 253, 0.2)',
            borderWidth: 2,
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false // Permite que ajustemos la altura con CSS
      }
    });
  }
}