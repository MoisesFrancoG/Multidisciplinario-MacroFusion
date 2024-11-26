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
  credentials = {
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  onLogin(form: any): void {
    if (form.valid) {
      this.authService.login(this.credentials).subscribe({
        next: (response) => {
          console.log('Login response:', response);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          console.error('Login error:', error);
          Swal.fire('Error', 'Credenciales inválidas. Por favor, verifica tus datos.', 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Por favor, completa todos los campos correctamente.', 'error');
    }
  }
}
