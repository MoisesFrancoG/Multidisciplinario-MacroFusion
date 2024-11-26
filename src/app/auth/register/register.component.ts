import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { RegisterUser } from '../../models/register-user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
  standalone: false
})
export class RegisterComponent {

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
    // Limpia espacios antes de validar
    this.trimEmail();

    // Verifica si el formulario es válido
    if (!this.user.nombre || !this.user.userpassword ||
        this.user.edad <= 0 || this.user.peso <= 0 || this.user.estatura <= 0) {
      alert('Por favor, llena todos los campos correctamente.');
      return;
    }

    console.log('Datos de registro:', this.user);

    // Realiza el registro
    this.authService.register(this.user).subscribe(
      response => {
        alert('Registro exitoso. Ahora puedes iniciar sesión.');
        this.router.navigate(['/login']);
      },
      error => {
        console.error('Error en el registro:', error);
        alert('Error en el registro: ' + error.message);
      }
    );
  }

  trimEmail(): void {
    // Elimina espacios en blanco del email
    this.user.email = this.user.email.trim();
  }

}

