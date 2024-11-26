import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Usuario } from '../models/usuario';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  private urlUser : string = "http://35.174.29.231:8000/api/user"
  constructor(private http: HttpClient) { }

  getUserId(id: number): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.urlUser}/${id}`)
  }
  updateUser(id: number, user : Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.urlUser}/${id}`,user)
  }
}
