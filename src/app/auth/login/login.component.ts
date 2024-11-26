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

    this.authService.login(this.credentials).subscribe({
      next: (response) => {
        console.log('Login response:', response);

        // SweetAlert de éxito
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Inicio de sesión exitoso',
          showConfirmButton: false,
          timer: 900,
        });

        // Mantener el spinner durante 3 segundos antes de navegar
        setTimeout(() => {
          this.isLoading = false; // Oculta el spinner
          this.router.navigate(['/dashboard']); // Navega al dashboard
        }, 3000);
      },
      error: (error) => {
        this.isLoading = false; // Oculta el spinner

        // SweetAlert de error
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Por favor, revisa tus credenciales.',
        });

        console.error('Login error:', error);
      }
    });
  }
}
