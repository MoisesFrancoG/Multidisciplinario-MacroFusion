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

  isLoading = false; // Controla si se muestra el spinner


  constructor(private authService: AuthService, private router: Router) {}

  login(): void {
    this.isLoading = true; // Activa el spinner

    console.log(this.credentials),
    this.authService.login(this.credentials).subscribe({
      next: (response) => {

        console.log('Login response:', response);
        // this.router.navigate(['/dashboard']); // Navega al dashboard una vez autenticado
        setTimeout(() => {
          this.isLoading = false; // Ocultar el spinner
          this.router.navigate(['/dashboard']); // Navegar después del temporizador
        }, 1500);
      },
      error: (error) => {
        this.isLoading = false; // Oculta el spinner
        console.error('Login error:', error);
        alert('Error al iniciar sesión');
      }
    });
  }
}
