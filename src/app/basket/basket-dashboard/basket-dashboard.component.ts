import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Food } from '../../models/food';
import { FoodService } from '../../services/food.service';


@Component({
  selector: 'app-basket-dashboard',
  templateUrl: './basket-dashboard.component.html',
  styleUrl: './basket-dashboard.component.css'
})
export class BasketDashboardComponent implements OnInit {

  foods: Food[] = [];


  constructor(private foodService: FoodService, private router: Router) {}

  ngOnInit() {
    console.log(this.foods)
    this.loadFoods();
  }

  loadFoods() {
    this.foodService.getFoods().subscribe({
      next: (foods) => {
        console.log(foods)
        this.foods = foods;
      },
      error: (error) => {
        console.error('Error loading foods:', error);
      }
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
      }
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

}
