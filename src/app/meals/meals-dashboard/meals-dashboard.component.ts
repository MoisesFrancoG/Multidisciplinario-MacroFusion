import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FoodConsumption } from '../../models/food-consumption';
import { FoodService } from '../../services/food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListaAlimentos } from '../../models/lista-alimentos';

@Component({
  selector: 'app-meals-dashboard',
  templateUrl: './meals-dashboard.component.html',
  styleUrl: './meals-dashboard.component.css'
})
export class MealsDashboardComponent implements OnInit{
  isEditMode = false;
  isModalOpen = false;
  isEditModalOpen = false; // Para el modal de edición
  isDetailsModalOpen = false;

  selectedFoodToAdd!: Food; // Alimento seleccionado para agregar
  selectedFoodToEdit!: ListaAlimentos; // Alimento seleccionado para editar

  selectedFood!: ListaAlimentos;
  meals: FoodConsumption[] = [];
  desayunoMeals: FoodConsumption[] = [];
  comidaMeals: FoodConsumption[] = [];
  cenaMeals: FoodConsumption[] = [];

  userId = parseInt(localStorage.getItem('user_id') || '0', 10);
  idConsumo: number | null = null;
  listaAlimentos: ListaAlimentos | null = null
  selectedFoodFromList!: Food;


  constructor(private foodService: FoodService) {}

  ngOnInit(): void {
    this.initializeData();
  }

  private initializeData(): void {
    this.meals = [];
    this.desayunoMeals = [];
    this.comidaMeals = [];
    this.cenaMeals = [];
    this.idConsumo = null;

    this.loadConsumo(() => {
      if (this.idConsumo) {
        this.fetchMeals(this.idConsumo);
      }
    });
  }

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

  private loadConsumo(callback?: () => void): void {
    if (this.userId) {
      this.foodService.getConsumoId(this.userId).subscribe({
        next: (response) => {
          this.idConsumo = response.idconsumo;
          localStorage.setItem('idconsumo', this.idConsumo.toString());
          console.log('idConsumo loaded:', this.idConsumo);

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
          this.meals = this.meals.filter(meal => meal.idlistaalimentos !== id);
          this.filterMealsByCategory();
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

  openAddModal(): void {
    this.isModalOpen = true;
  }

  closeAddModal(): void {
    this.isModalOpen = false;
  }

  openEditModal(meal: FoodConsumption): void {
    this.selectedFoodToEdit = { ...meal };
    this.isEditModalOpen = true;
  }

  closeEditModal(): void {
    this.isEditModalOpen = false;
  }

  addFood(food: ListaAlimentos): void {
    this.foodService.postFoodConsumption(food).subscribe({
      next: (newFood) => {
        this.meals.push(newFood as FoodConsumption);
        this.filterMealsByCategory();
        this.closeAddModal();
      },
      error: (err) => {
        console.error('Error al agregar alimento:', err);
        alert('Hubo un error al agregar el alimento.');
      },
    });
  }

  editFood(food: ListaAlimentos): void {
    this.foodService.updateFoodConsumption(food.idlistaalimentos!, food).subscribe({
      next: (updatedFood) => {
        const index = this.meals.findIndex(
          (meal) => meal.idlistaalimentos === food.idlistaalimentos
        );
        if (index !== -1) {
          this.meals[index] = updatedFood as FoodConsumption;
          this.filterMealsByCategory();
        }
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error actualizando el alimento:', err);
        alert('Hubo un error al actualizar el alimento.');
      },
    });
  }



  onFoodSelected(food: Food | null): void {
    this.isModalOpen = false;
    if (food) {
      this.selectedFoodFromList = food;
      this.selectedFood = {
        idlistaalimentos: 0,
        idcomida: parseInt(localStorage.getItem('idconsumo') || '0', 10),
        idalimento: food.idalimentos!,
        porcion: food.porcion || 0,
        categoriacomida: food.categoria || 'Desayuno',
      };
      this.isDetailsModalOpen = true;
      this.isEditMode = false;
    }
  }


  onFoodAdded(consumption: ListaAlimentos | null): void {
    this.isDetailsModalOpen = false;
    if (consumption) {
      this.foodService.postFoodConsumption(consumption).subscribe({
        next: (res) => {
          console.log(res)
          console.log('Nuevo alimento agregado:', consumption);
          this.initializeData();
        },
        error: (err) => {
          console.error('Error al agregar alimento:', err);
          alert('Hubo un error al agregar el alimento.');
        },
      });
    }
  }




  onFoodAddedOrUpdated(food: ListaAlimentos): void {
    this.isDetailsModalOpen = false;

    if (this.isEditMode) {
      this.foodService.updateFoodConsumption(food.idlistaalimentos!, food).subscribe({
        next: (updatedFood) => {
          this.removeOldFood(food.idlistaalimentos!);

          this.meals.push(updatedFood as FoodConsumption);

          this.filterMealsByCategory();

          console.log('Alimento actualizado con éxito:', updatedFood);
        },
        error: (err) => {
          console.error('Error actualizando el alimento:', err);
          alert('Hubo un error al actualizar el alimento.');
        },
      });
    } else {
      this.foodService.postFoodConsumption(food).subscribe({
        next: (newFood) => {
          this.meals.push(newFood as FoodConsumption);

          this.filterMealsByCategory();

          console.log('Nuevo alimento agregado con éxito:', newFood);
        },
        error: (err) => {
          console.error('Error al agregar alimento:', err);
          alert('Hubo un error al agregar el alimento.');
        },
      });
    }
  }











  editMeal(meal: FoodConsumption): void {
    this.selectedFoodFromList = {
      idalimentos: meal.idalimento,
      id_usuario: this.userId,
      nombre: meal.nombre,
      marca: '',
      calorias: meal.calorias,
      proteina: meal.proteina,
      carbohidratos: meal.carbohidratos,
      grasa: meal.grasa,
      porcion: meal.porcion,
      tipomedida: meal.tipomedida,
      categoria: meal.categoriacomida,
    };

    this.selectedFood = {
      idlistaalimentos: meal.idlistaalimentos!,
      idcomida: meal.idcomida,
      idalimento: meal.idalimento,
      porcion: meal.porcion,
      categoriacomida: meal.categoriacomida,
    };

    this.isEditMode = true;
    this.isDetailsModalOpen = true;
  }



  closeModal(): void {
    this.isDetailsModalOpen = false;
  }


  private removeOldFood(idlistaalimentos: number): void {
    const index = this.meals.findIndex((meal) => meal.idlistaalimentos === idlistaalimentos);

    if (index !== -1) {
      const foodToRemove = this.meals[index];

      this.meals.splice(index, 1);

      switch (foodToRemove.categoriacomida) {
        case 'Desayuno':
          this.desayunoMeals = this.desayunoMeals.filter(
            (item) => item.idlistaalimentos !== idlistaalimentos
          );
          break;
        case 'Comida':
          this.comidaMeals = this.comidaMeals.filter(
            (item) => item.idlistaalimentos !== idlistaalimentos
          );
          break;
        case 'Cena':
          this.cenaMeals = this.cenaMeals.filter(
            (item) => item.idlistaalimentos !== idlistaalimentos
          );
          break;
      }
    }
  }




}
