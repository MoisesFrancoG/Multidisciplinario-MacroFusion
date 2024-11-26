import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ejercicio } from '../models/Ejercicio';

@Injectable({
  providedIn: 'root'
})
export class EjerciciosService {
  private apiUrl = 'http://35.174.29.231:8000/api/ejercicios'; // Reemplaza con la URL real de tu API

  constructor(private http: HttpClient) {}

  getEjercicios(): Observable<Ejercicio[]> {
    return this.http.get<Ejercicio[]>(`${this.apiUrl}`);
  }
}
