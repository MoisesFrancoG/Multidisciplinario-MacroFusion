import { Component } from '@angular/core';
import { Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { LoginUser } from '../../models/login-user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  // standalone: false
})
export class LoginComponent {

  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    console.log(this.credentials),
    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);
        this.router.navigate(['/dashboard']); // Navega al dashboard una vez autenticado
      },
      error: (error) => {
        console.error('Login error:', error);
        alert('Error al iniciar sesión');
      }
    });
  }
}
