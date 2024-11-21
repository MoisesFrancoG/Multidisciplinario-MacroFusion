import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-dashboard',
  templateUrl: './user-dashboard.component.html',
  styleUrl: './user-dashboard.component.css'
})
export class UserDashboardComponent {

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
    this.router.navigate(['/']); // Redireccionar a la vista principal
  }

}
