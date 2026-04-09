import { Component, ElementRef, OnInit, ViewChild, inject } from '@angular/core';
import { ApiService } from '../service/api';
// Importamos todo lo de Chart.js y lo registramos
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-grafico',
  standalone: true,
  templateUrl: './grafico.html'
})
export class Grafico implements OnInit {
  private apiService = inject(ApiService);

  // Agarra el elemento <canvas> del HTML
  @ViewChild('miGrafico') graficoRef!: ElementRef; 
  chartInstancia: any;

  ngOnInit() {
    this.cargarDatosYGraficar();
  }

  cargarDatosYGraficar() {
    this.apiService.getDatosGraficoMwr().subscribe({
      next: (datos) => {
        // Desarmamos el JSON de Django en listas para Chart.js
        const fechas = datos.map(d => d.fecha);
        const portfolioPct = datos.map(d => d.portfolio_pct);
        const spyPct = datos.map(d => d.spy_sombra_pct);

        this.renderizarGrafico(fechas, portfolioPct, spyPct);
      },
      error: (err) => console.error('Error trayendo datos del gráfico', err)
    });
  }

  renderizarGrafico(fechas: string[], portfolioPct: number[], spyPct: number[]) {
    // Si ya existía un gráfico, lo destruimos para no encimar
    if (this.chartInstancia) {
      this.chartInstancia.destroy();
    }

    const ctx = this.graficoRef.nativeElement.getContext('2d');

    this.chartInstancia = new Chart(ctx, {
      type: 'line', // Gráfico de líneas
      data: {
        labels: fechas, // El Eje X
        datasets: [
          {
            label: 'Mi Portfolio (%)',
            data: portfolioPct,
            borderColor: '#0d6efd', // Azul Bootstrap
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            borderWidth: 3,
            tension: 0.3, // Curvitas suaves
            fill: true
          },
          {
            label: 'SPY Sombra (%)',
            data: spyPct,
            borderColor: '#dc3545', // Rojo Bootstrap
            borderWidth: 2,
            borderDash: [5, 5], // Línea punteada para el SPY
            tension: 0.3
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'top' },
          tooltip: { mode: 'index', intersect: false } // Para que al pasar el mouse te muestre ambos datos a la vez
        },
        scales: {
          y: {
            ticks: {
              callback: function(value) {
                return value + '%'; // Le agregamos el % al eje Y
              }
            }
          }
        }
      }
    });
  }
}