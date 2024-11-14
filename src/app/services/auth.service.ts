import { Injectable } from '@angular/core';
import { User } from '../../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private user: User[] = [];

  register(user: User): void {
    this.user.push(user);
    console.log('Usuario registrado:', user);
  }
}
