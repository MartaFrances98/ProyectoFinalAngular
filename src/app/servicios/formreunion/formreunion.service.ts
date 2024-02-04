import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormreunionService {

  private apiUrl = 'http://localhost:5000'; // Asegúrate de que la URL sea correcta

  constructor(private http: HttpClient) { }

  getReuniones(): Observable<any> {
    return this.http.get(`${this.apiUrl}/reuniones`);
  }

  createReunion(reunionData: any): Observable<any> {
    console.log(reunionData);
    return this.http.post(`${this.apiUrl}/reuniones`, reunionData);
  }
}