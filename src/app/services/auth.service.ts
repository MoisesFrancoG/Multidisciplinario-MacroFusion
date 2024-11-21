import { Injectable } from '@angular/core';
import { RegisterUser } from '../models/register-user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LoginUser } from '../models/login-user';
import { catchError, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = 'http://127.0.0.1:8000/api/register';

  constructor(private http: HttpClient) { }

  register(user: RegisterUser): Observable<RegisterUser> {
    return this.http.post<RegisterUser>('http://127.0.0.1:8000/api/register', user);
  }

  login(credentials: any): Observable<LoginUser> {
    return this.http.post<LoginUser>('http://127.0.0.1:8000/api/login', credentials).pipe(

      tap((response) => {
        console.log('Logged in successfully', response),

        localStorage.setItem('user_id', response.user_id.toString());
        localStorage.setItem('token_type', response.token_type);
        localStorage.setItem('access_token', response.access_token);
      }),
      catchError((error) => {
        console.error('Login error:', error);
        throw error;
      })
    );
  }
}
