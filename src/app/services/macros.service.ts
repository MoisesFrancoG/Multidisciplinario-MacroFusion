import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Macro } from '../models/Macro';

@Injectable({
  providedIn: 'root'
})
export class MacrosService {

  private macroUrl: string = "http://127.0.0.1:8000/api/macros"
  constructor(private http: HttpClient) { }

  getMacro(id: number): Observable<Macro> {
    return this.http.get<Macro>(`${this.macroUrl}/${id}`)
  }

  postMacro(macro: Macro): Observable<Macro> {
    return this.http.post<Macro>(this.macroUrl,macro)
  }
}
