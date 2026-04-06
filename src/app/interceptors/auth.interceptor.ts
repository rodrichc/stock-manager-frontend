import { HttpInterceptorFn } from '@angular/common/http';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  // 1. Buscamos la "pulsera VIP" que guardaste en el login
  const token = localStorage.getItem('access_token');

  // 2. Si el token existe, modificamos la petición
  if (token) {
    // IMPORTANTE: En Angular las peticiones son inmutables (no se pueden modificar).
    // Por eso la "clonamos" y a ese clon le inyectamos la cabecera Bearer.
    const requestClonada = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`
      }
    });
    
    // Dejamos pasar a la petición clonada (con el token)
    return next(requestClonada);
  }

  // 3. Si no hay token (ej: el usuario no se logueó), dejamos pasar la petición original sin tocarla
  return next(req);
};