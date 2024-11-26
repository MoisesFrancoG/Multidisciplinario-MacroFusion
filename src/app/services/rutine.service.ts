import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Ejercicio } from '../models/Ejercicio';

@Injectable({
  providedIn: 'root'
})
export class RutineService {
  private rutineUrl: string = "http://127.0.0.1:8000/api/ejerciciosbyRutine"
  constructor(private http: HttpClient) { }

  getExercicesbyRutine(id: number): Observable<Ejercicio[]>{ 
    return this.http.get<Ejercicio[]>(`${this.rutineUrl}/${id}`)
  }
}
