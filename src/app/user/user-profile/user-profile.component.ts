import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css',
})
export class UserProfileComponent implements OnInit {

  constructor(
    private UserService: UserService,
    private router: Router
  ) {}

  showDropdown = false;
  usuario: Usuario | null = null;
  idUsuario = parseInt(localStorage.getItem('user_id') || '0', 10);
  indiceActividad: number = 0;
  textoActividad: string = '';

  ngOnInit(): void {
    this.loadUser();
  }

  loadUser(): void {
    this.UserService.getUserId(this.idUsuario).subscribe((response) => {
      this.usuario = response;
      this.indiceActividad = response.indiceactividad;
      this.actualizarTextoActividad(this.indiceActividad);
    });
  }

  actualizarTextoActividad(indice: number): void {
    switch (indice) {
      case 1.2:
        this.textoActividad = 'Sedentario';
        break;
      case 1.375:
        this.textoActividad = 'Relajado';
        break;
      case 1.55:
        this.textoActividad = 'Activo';
        break;
      case 1.725:
        this.textoActividad = 'Extremadamente activo';
        break;
      default:
        this.textoActividad = 'No especificado';
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
