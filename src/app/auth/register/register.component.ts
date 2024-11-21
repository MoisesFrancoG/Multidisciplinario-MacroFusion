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
    // Convertir los valores numéricos para asegurar el tipo correcto
    this.user.edad = Number(this.user.edad);
    this.user.peso = Number(this.user.peso);
    this.user.estatura = Number(this.user.estatura);
    this.user.indiceactividad = Number(this.user.indiceactividad);

    console.log('Datos de registro:', this.user);

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
}

