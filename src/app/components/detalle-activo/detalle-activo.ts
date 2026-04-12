import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { ApiService } from '../../services/api';
import { Chart, registerables } from 'chart.js';

Chart.register(...registerables);

@Component({
  selector: 'app-detalle-activo',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalle-activo.html'
})
export class DetalleActivo implements OnInit {
  private route = inject(ActivatedRoute); // Para leer la URL
  private apiService = inject(ApiService);
  
  ticker = signal<string>('');
  operaciones = signal<any[]>([]);
  public chart: any;

  ngOnInit() {
    // 1. Obtenemos el ticker de la ruta (ej: /activo/AAPL -> 'AAPL')
    const tickerParam = this.route.snapshot.paramMap.get('ticker');
    
    if (tickerParam) {
      this.ticker.set(tickerParam);
      
      // 2. Pedimos los datos históricos de ese activo
      this.apiService.getEvolucionActivo(tickerParam).subscribe(datos => {
        const fechas = datos.map(d => d.fecha);
        const precios = datos.map(d => d.cantidad_invertida);
        const valorPosicion = datos.map(d => d.valor_posicion);
        
        this.renderizarGrafico(fechas, precios, valorPosicion);
      });

      // 3. Pedimos las operaciones de ese activo
      this.apiService.getOperacionesActivo(tickerParam).subscribe(ops => {
        this.operaciones.set(ops);
      });
    }
  }

  renderizarGrafico(fechas: string[], precios: number[], valor: number[]) {
    this.chart = new Chart('canvasDetalle', {
      type: 'line',
      data: {
        labels: fechas,
        datasets: [
          {
            label: 'Precio USD',
            data: precios,
            borderColor: '#ffc107',
            tension: 0.3,
            yAxisID: 'y' // Eje izquierdo para el precio
          },
          { 
            label: 'Valor de mi Posición (USD)',
            data: valor,
            borderColor: '#0d6efd',
            backgroundColor: 'rgba(13, 110, 253, 0.1)',
            fill: true,
            tension: 0.3,
            yAxisID: 'y1' // Eje derecho para el valor total
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
          y: { type: 'linear', display: true, position: 'left' },
          y1: { type: 'linear', display: true, position: 'right', grid: { drawOnChartArea: false } }
        }
      }
    });
  }
}