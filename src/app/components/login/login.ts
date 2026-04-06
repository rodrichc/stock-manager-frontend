import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../../service/api'; // Ojo con tu ruta acá
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html'
})
export class Login {
  private apiService = inject(ApiService);
  private router = inject(Router); // Herramienta para navegar entre pantallas

  credenciales = {
    username: '',
    password: ''
  };

  mensajeError = '';

  iniciarSesion() {
    this.mensajeError = '';

    this.apiService.login(this.credenciales).subscribe({
      next: (respuesta: any) => {
        // SimpleJWT de Django devuelve un objeto con "access" y "refresh"
        // Nosotros guardamos el "access" (la pulsera VIP)
        this.apiService.setToken(respuesta.access);
        
        // Lo mandamos al dashboard de una
        this.router.navigate(['/']); 
      },
      error: (err) => {
        console.error(err);
        this.mensajeError = 'Usuario o contraseña incorrectos.';
      }
    });
  }
}