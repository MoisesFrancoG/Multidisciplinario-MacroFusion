import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';

@Component({
  selector: 'app-basket-dashboard',
  templateUrl: './basket-dashboard.component.html',
  styleUrl: './basket-dashboard.component.css',
})
export class BasketDashboardComponent implements OnInit {

  showDropdown = false;
  foods: Food[] = [];
  idsuario = parseInt(localStorage.getItem('user_id') || '0', 10);
  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getFoodsId(this.idsuario).subscribe((response) => {
      (this.foods = response), console.log(response);
    });
  }

  deleteFood(id: number): void {
    this.foodService.deleteAlimento(id).subscribe({
      next: () => {
        alert('Alimento eliminado con éxito');
        this.loadFoods(); // Recarga la lista de alimentos
      },
      error: (error) => {
        alert('Error al eliminar el alimento');
        console.error('Delete error', error);
      },
    });
  }

  navigateToAddFood() {
    this.router.navigate(['/add-food']);
  }

  navigateToEditFood(id?: number) {
    if (id) {
      this.router.navigate(['/add-food', id]);
    } else {
      console.error('Attempted to edit food without an ID');
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
    this.router.navigate(['/']); // Redireccionar a la vista principal
  }



}
