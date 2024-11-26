import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLoading = false;
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any): void {
    if (form.valid) {
      this.isLoading = true; // Activa el loader
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          console.log('Login response:', response);

          // SweetAlert de éxito
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            showConfirmButton: false,
            timer: 700,
          });

          // Navegar después del temporizador
          setTimeout(() => {
            this.isLoading = false; // Oculta el loader
            this.router.navigate(['/dashboard']); // Navega al dashboard
          }, 1600); // 1.6 segundos
        },
        error: (error) => {
          this.isLoading = false; // Oculta el loader

          // SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Credenciales inválidas. Por favor, verifica tus datos.',
          });

          console.error('Login error:', error);
        }
      });
    } else {
      // SweetAlert de formulario inválido
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
    }
  }
}
