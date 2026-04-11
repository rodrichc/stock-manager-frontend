import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})

export class ApiService {
  private http = inject(HttpClient); 

  private apiUrl = 'https://stock-manager-backend-production-5986.up.railway.app/'; 

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
    this.isAuthenticated.set(false); // ¡Avisamos que salió!
  }

  getResumen() {
    return this.http.get(`${this.apiUrl}portfolio/`); 
  }

  getDetalle() {
   return this.http.get<any[]>(`${this.apiUrl}portfolio/detalle/`);
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
