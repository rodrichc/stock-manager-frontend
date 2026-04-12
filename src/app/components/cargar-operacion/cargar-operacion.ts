import { Component, inject } from '@angular/core';
import { ApiService } from '../../services/api';
// 1. IMPORTANTE: Agregamos NgForm acá
import { FormsModule, NgForm } from '@angular/forms'; 

@Component({
  selector: 'app-cargar-operacion',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './cargar-operacion.html'
})
export class CargarOperacion {
  private apiService = inject(ApiService);

  operacion = {
    tipo_operacion: 'COMPRA', 
    activo: '', 
    fecha: new Date().toISOString().split('T')[0], 
    nominales: null, 
    moneda: 'ARS', 
    precio_unitario: null, 
    dolar_ccl: null 
  };

  mensajeExito = false;
  mensajeError = '';

  // 2. IMPORTANTE: Ahora la función recibe "formulario: NgForm"
  guardarOperacion(formulario: NgForm) {
    this.mensajeError = '';
    this.mensajeExito = false;
    
    this.operacion.activo = this.operacion.activo.toUpperCase();
    
    this.apiService.cargarOperacion(this.operacion).subscribe({
      next: (respuesta) => {
        // Agregamos un log para que veas en la consola (F12) que salió todo bien
        console.log('✅ Respuesta exitosa del servidor:', respuesta);
        
        this.mensajeExito = true;
        
        // 3. Usamos la herramienta oficial para limpiar el formulario, 
        // pero dejando la fecha, moneda y tipo como estaban para mayor comodidad.
        if (formulario) {
          formulario.resetForm({
            tipo_operacion: this.operacion.tipo_operacion,
            activo: '',
            fecha: this.operacion.fecha,
            nominales: null,
            moneda: this.operacion.moneda,
            precio_unitario: null,
            dolar_ccl: null
          });
        }
        
        // El cartelito verde desaparece a los 3 segundos
        setTimeout(() => this.mensajeExito = false, 3000);
      },
      error: (err) => {
        console.error('❌ Error devuelto por Django:', err);
        this.mensajeError = 'Error al guardar. Revisá los datos ingresados.';
      }
    });
  }
}