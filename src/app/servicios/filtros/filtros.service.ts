import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FiltrosService {
  private apiUrl = 'http://localhost:5000/reuniones'; // URL base de tu API para reuniones

  constructor(private http: HttpClient) { }

  // Obtener citas pendientes
  getCitasPendientes(): Observable<any> {
    const token = sessionStorage.getItem('token'); // Asegúrate de que el token se guarda en sessionStorage
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/pendientes`, { headers });
  }

  // Obtener citas en progreso
  getCitasEnProgreso(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/enprogreso`, { headers });
  }

  // Obtener citas completadas
  getCitasCompletadas(): Observable<any> {
    const token = sessionStorage.getItem('token');
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get(`${this.apiUrl}/completadas`, { headers });
  }
}
