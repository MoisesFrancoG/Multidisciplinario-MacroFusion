import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../models/register-user';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {
  isLoading = false;
  user: RegisterUser = {
    // idusuario: 0,
    nombre: '',
    userpassword: '',
    email: '',
    edad: 0,
    peso: 0,
    estatura: 0,
    sexo: '',
    indiceactividad: 0.0,
  };

  constructor(private authService: AuthService, private router: Router) {}

  register(): void {
    this.trimEmail();

    if (!this.user.nombre || !this.user.userpassword || this.user.edad <= 0 || this.user.peso <= 0 || this.user.estatura <= 0) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, llena todos los campos correctamente.',
        showConfirmButton: false,
        timer: 1500 // Desaparece automáticamente en 1.5 segundos
      });
      return;
    }

    this.isLoading = true; // Activa el loader
    this.authService.register(this.user).subscribe({
      next: () => {
        this.isLoading = false; // Oculta el loader
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Registro exitoso. Ahora puedes iniciar sesión.',
          showConfirmButton: false,
          timer: 1500 // Desaparece automáticamente en 1.5 segundos
        });
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 900); // Navega después de que desaparezca el modal
      },
      error: (error) => {
        this.isLoading = false; // Oculta el loader
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error en el registro. Por favor, intenta nuevamente.',
          showConfirmButton: false,
          timer: 1200 // Desaparece automáticamente en 1.5 segundos
        });
        console.error('Error en el registro:', error);
      }
    });
  }

  trimEmail(): void {
    this.user.email = this.user.email.trim();
  }
}

