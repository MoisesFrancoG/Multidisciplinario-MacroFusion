import { Component } from '@angular/core';
import { User } from '../../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: false
})
export class RegisterComponent {
  user: User = {
    id: 0,
    name: '',
    email: '',
    password: '',
    estatura: '',
    peso: '',
    edad: '',
    sexo: '',
    indiceActividad: '',
  }

  constructor(private authService: AuthService){}

  onSubmit(): void {
    this.authService.register(this.user)
  }
}
