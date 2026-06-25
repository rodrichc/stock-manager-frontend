import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private http = inject(HttpClient); 

  private apiUrl = 'https://stock-manager-backend-pssm.onrender.com/'; 

  // 1. Creamos un Signal que arranca leyendo si hay token guardado
  isAuthenticated = signal<boolean>(this.chequearToken());

  // Función auxiliar para saber si hay token
  private chequearToken(): boolean {
    // Devuelve true si existe el token, false si no
    return !!localStorage.getItem('access_token'); 
  }

  // 2. Modificamos el setToken para que también actualice el Signal
  setToken(token: string) {
    localStorage.setItem('access_token', token);
    this.isAuthenticated.set(true); // ¡Avisamos que entró!
  }

  // 3. Agregamos la función para cerrar sesión
  logout() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('cache_activos');
    this.isAuthenticated.set(false); // ¡Avisamos que salió!
  }

  getResumen() {
    return this.http.get(`${this.apiUrl}portfolio/`); 
  }

  getDetalle(): Observable<any[]> {
    return new Observable(observador => {
      const cacheViejo = localStorage.getItem('cache_activos');
      
      if (cacheViejo) {
        observador.next(JSON.parse(cacheViejo));
      }

      this.http.get<any[]>(`${this.apiUrl}portfolio/detalle/`).subscribe({
        next: (datosFrescos) => {
          localStorage.setItem('cache_activos', JSON.stringify(datosFrescos));
          observador.next(datosFrescos);
        },
        error: (err) => {
          console.error('El backend no respondió:', err);
          observador.error(err);
        }
      });
    });
  }

  getEvolucion() {
    return this.http.get<any[]>(`${this.apiUrl}portfolio/evolucion/`);
  }

  getEvolucionActivo(ticker: string) {
    return this.http.get<any[]>(`${this.apiUrl}portfolio/evolucion/${ticker}/`);
  }

  getOperacionesActivo(ticker: string) {
    return this.http.get<any[]>(`${this.apiUrl}operaciones/${ticker}/`);
  }

  getRendimientoTwr(inicio: string, fin: string) {
    return this.http.get<any>(`${this.apiUrl}portfolio/rendimiento-real?inicio=${inicio}&fin=${fin}`);
  }

  cargarOperacion(datos: any) {
    return this.http.post(`${this.apiUrl}operaciones/cargar/`, datos); 
  }

  login(credenciales: any) {
    return this.http.post(`${this.apiUrl}login/`, credenciales);
  }

  getRendimientoSombra() {
    return this.http.get(`${this.apiUrl}portfolio/rendimiento-sombra/`); 
  }

  getDatosGraficoMwr() {
    return this.http.get<any[]>(`${this.apiUrl}portfolio/grafico-sombra/`);
  }
}
