import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { Usuario } from '../../models/usuario';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit {

  showDropdown = false;
  editForm: FormGroup;
  usuario: Usuario | null = null;
  idusuario: number;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.idusuario = parseInt(localStorage.getItem('user_id') || '0', 10);
    this.editForm = this.fb.group({
      estatura: [''],
      peso: [''],
      edad: [''],
      sexo: [''],
      indiceactividad: [''],
    });
  }

  ngOnInit(): void {
    this.userService.getUserId(this.idusuario).subscribe((response) => {
      this.usuario = response;
      this.editForm.patchValue({
        estatura: response.estatura,
        peso: response.peso,
        edad: response.edad,
        sexo: response.sexo,
        indiceactividad: response.indiceactividad,
      });
    });
  }

  onSubmit(): void {
    if (this.usuario) {
      const updatedUser: Usuario = {
        ...this.usuario,
        ...this.editForm.value,
      };

      this.userService.updateUser(this.idusuario, updatedUser).subscribe({
        next: () => {
          // SweetAlert de éxito
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '¡Perfil actualizado correctamente!',
            showConfirmButton: false,
            timer: 900, // La alerta se cerrará automáticamente después de 1.5 segundos
          });

          setTimeout(() => {
            this.router.navigate(['/personal-info']); // Navegar a la vista de información personal
          }, 900); // Espera un poco más que el tiempo de la alerta
        },
        error: (error) => {
          // SweetAlert de error
          Swal.fire({
            icon: 'error',
            title: 'Error al actualizar el perfil',
            text: 'Por favor, intenta nuevamente.',
          });
          console.error('Error al actualizar el perfil:', error);
        },
      });
    }
  }



  toggleDropdown() {
    this.showDropdown = !this.showDropdown;
  }

  closeDropdown() {
    event?.stopPropagation();
    this.showDropdown = false;
  }


  logout() {
    localStorage.clear(); // Limpiar todos los datos de sesión

    // Mostrar SweetAlert para notificar el cierre de sesión exitoso
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: 'Hasta pronto',
      text: 'Te esperamos de vuelta',
      showConfirmButton: false,
      timer: 1000,
    });

    // Redirigir a la vista principal después de un breve retraso
    setTimeout(() => {
      this.router.navigate(['/']); // Navegar a la vista principal
    }, 1000);
  }

}
