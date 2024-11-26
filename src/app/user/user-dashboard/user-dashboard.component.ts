import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {
  isLoading: boolean = false; // Controla la visibilidad del loader
  showDropdown = false;

  constructor(private router: Router) {}

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

  navigateWithLoader(route: string): void {
    this.isLoading = true; // Muestra el loader

    setTimeout(() => {
      this.isLoading = false; // Oculta el loader después de 3 segundos
      this.router.navigate([route]); // Navega a la ruta
    }, 800); // 3000ms = 3 segundos
  }

}
