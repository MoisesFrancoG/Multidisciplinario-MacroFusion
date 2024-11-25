import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FoodConsumption } from '../../models/food-consumption';
import { FoodService } from '../../services/food.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-meals-dashboard',
  templateUrl: './meals-dashboard.component.html',
  styleUrl: './meals-dashboard.component.css'
})
export class MealsDashboardComponent implements OnInit{
  isModalOpen = false;
  isDetailsModalOpen = false;
  selectedFood!: Food;
  meals: FoodConsumption[] = [];
  desayunoMeals: FoodConsumption[] = [];
  comidaMeals: FoodConsumption[] = [];
  cenaMeals: FoodConsumption[] = [];
  userId = parseInt(localStorage.getItem('user_id') || '0', 10);
  idConsumo: number | null = null;

  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.initializeData();
  }

  /**
   * Initialize the data for the component, resetting previous user's data.
   */
  private initializeData(): void {
    // Reset data to avoid showing previous user's data
    this.meals = [];
    this.desayunoMeals = [];
    this.comidaMeals = [];
    this.cenaMeals = [];
    this.idConsumo = null;

    // Load the current user's consumo ID
    this.loadConsumo(() => {
      // Fetch meals for the current user's consumo ID
      if (this.idConsumo) {
        this.fetchMeals(this.idConsumo);
      }
    });
  }

  /**
   * Fetch meals by `idConsumo` and categorize them.
   * @param idConsumo - The consumption ID to fetch meals for.
   */
  private fetchMeals(idConsumo: number): void {
    this.foodService.getFoodListByConsumption(idConsumo).subscribe({
      next: (data) => {
        this.meals = data;
        this.filterMealsByCategory();
        console.log('Meals fetched:', data);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error fetching meals:', error);
      },
    });
  }

  /**
   * Load the consumo ID for the current user.
   * @param callback - A function to execute after loading the consumo ID.
   */
  private loadConsumo(callback?: () => void): void {
    if (this.userId) {
      this.foodService.getConsumoId(this.userId).subscribe({
        next: (response) => {
          this.idConsumo = response.idconsumo;
          localStorage.setItem('idconsumo', this.idConsumo.toString());
          console.log('idConsumo loaded:', this.idConsumo);

          // Execute the callback if provided
          if (callback) {
            callback();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error loading idConsumo:', err);
        },
      });
    } else {
      console.error('User ID is not available in localStorage.');
    }
  }

  /**
   * Filter meals into categories (Desayuno, Comida, Cena).
   */
  filterMealsByCategory(): void {
    this.desayunoMeals = this.meals.filter(
      (meal) => meal.categoriacomida === 'Desayuno'
    );
    this.comidaMeals = this.meals.filter(
      (meal) => meal.categoriacomida === 'Comida'
    );
    this.cenaMeals = this.meals.filter(
      (meal) => meal.categoriacomida === 'Cena'
    );
  }

  deleteMeal(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar este alimento?')) {
      this.foodService.deleteFoodConsumption(id).subscribe({
        next: () => {
          alert('Alimento eliminado exitosamente.');
          this.meals = this.meals.filter(meal => meal.idlistaalimentos !== id); // Actualizar la lista localmente.
          this.filterMealsByCategory(); // Recalcular las categorías.
        },
        error: (err) => {
          console.error('Error al eliminar el alimento:', err);
          alert('Hubo un error al eliminar el alimento.');
        }
      });
    }
  }


  openModal(): void {
    this.isModalOpen = true;
  }

  onFoodSelected(food: Food | null): void {
    this.isModalOpen = false;
    if (food) {
      this.selectedFood = food;
      this.isDetailsModalOpen = true;
    }
  }

  onFoodAdded(consumption: FoodConsumption | null): void {
    this.isDetailsModalOpen = false;
    if (consumption) {
      this.foodService.postFoodConsumption(consumption).subscribe({
        next: () => {
          console.log('Nuevo alimento agregado:', consumption);
          this.initializeData(); // Recargar el componente
        },
        error: (err) => {
          console.error('Error al agregar alimento:', err);
          alert('Hubo un error al agregar el alimento.');
        },
      });
    }
  }





}
