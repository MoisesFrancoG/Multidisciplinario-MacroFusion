import { Component, OnInit } from '@angular/core';
import { Food } from '../../models/food';
import { FoodConsumption } from '../../models/food-consumption';
import { FoodService } from '../../services/food.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ListaAlimentos } from '../../models/lista-alimentos';
import { Router } from '@angular/router';
import { Usuario } from '../../models/usuario';
import { UserService } from '../../services/user.service';
import { MacrosService } from '../../services/macros.service';
import { Macro } from '../../models/Macro';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-meals-dashboard',
  templateUrl: './meals-dashboard.component.html',
  styleUrl: './meals-dashboard.component.css'
})
export class MealsDashboardComponent implements OnInit{

  showDropdown = false;
  isModalOpen = false;
  isDetailsModalOpen = false;
  selectedFood!: Food;
  meals: FoodConsumption[] = [];
  desayunoMeals: FoodConsumption[] = [];
  comidaMeals: FoodConsumption[] = [];
  cenaMeals: FoodConsumption[] = [];
  colacionMeals: FoodConsumption[] = [];

  userId = parseInt(localStorage.getItem('user_id') || '0', 10);
  idConsumo: number | null = null;
  listaAlimentos: ListaAlimentos | null = null
  userData : Usuario | null= null
  macros: Macro | null = null
  remainingCalories: number = 0;
  remainingProteins: number = 0;
  remainingFats: number = 0;
  remainingCarbs: number = 0;

  constructor(
    private foodService: FoodService,
    private router: Router,
    private userService: UserService,
    private macrosService: MacrosService
  ) {}

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
    this.colacionMeals = [];
    this.idConsumo = null;

    // Load the current user's consumo ID
    this.loadUserData(() => {
      this.loadConsumo(() => {
        if (this.idConsumo) {
          this.fetchMeals(this.idConsumo);
        }
      });
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
        // Calcular macronutrientes después de cargar las comidas
        this.calculateMacros();
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
    this.colacionMeals = this.meals.filter(
      (meal) => meal.categoriacomida === 'Colacion'
    );
  }

  deleteMeal(id: number | undefined): void {
    if (id && confirm('¿Estás seguro de que deseas eliminar este alimento?')) {
      this.foodService.deleteFoodConsumption(id).subscribe({
        next: () => {
          alert('Alimento eliminado exitosamente.');
          this.meals = this.meals.filter(meal => meal.idlistaalimentos !== id); // Actualizar la lista localmente.
          this.filterMealsByCategory(); // Recalcular las categorías.
          this.initializeData()
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

  onFoodAdded(consumption: ListaAlimentos | null): void {
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

  // Cargar datos del usuario desde el servicio
  private loadUserData(callback?: () => void): void {
    if (this.userId) {
      this.userService.getUserId(this.userId).subscribe({
        next: (response) => {
          this.userData = response;
          console.log('User data loaded:', this.userData);

          if (callback) {
            callback();
          }
        },
        error: (err: HttpErrorResponse) => {
          console.error('Error loading user data:', err);
        }
      });
    } else {
      console.error('User ID is not available in localStorage.');
    }
  }

  // Calcular los macronutrientes usando Mifflin-St.Jeor y los datos del usuario
  calculateMacros(): void {
    if (!this.userData || !this.userData.peso || !this.userData.estatura || !this.userData.edad || !this.userData.sexo || !this.userData.indiceactividad) {
      console.error('Faltan datos necesarios para calcular los macronutrientes.');
      return;
    }
    const weight = this.userData.peso; // Peso en kg
    const height = this.userData.estatura; // Estatura en cm
    const age = this.userData.edad; // Edad en años
    const sex = this.userData.sexo; // Sexo
    const activityIndex = this.userData.indiceactividad; // Índice de actividad

    let tmb: number;
    if (sex === 'Hombre') {
      tmb = (10 * weight) + (6.25 * height) - (5 * age) + 5;
    } else {
      tmb = (10 * weight) + (6.25 * height) - (5 * age) - 161;
    }

    let tcd: number;
    switch (activityIndex) {
      case 1: tcd = tmb * 1.2; break;
      case 2: tcd = tmb * 1.375; break;
      case 3: tcd = tmb * 1.55; break;
      case 4: tcd = tmb * 1.725; break;
      case 5: tcd = tmb * 1.9; break;
      default: tcd = tmb * 1.2;
    }

    const protein = Math.round(0.32 * tcd) / 4; // 25% de calorías de proteínas, 1g de proteína = 4 Kcal
    const fat = Math.floor(0.24 * tcd) / 9; // 30% de calorías de grasas, 1g de grasa = 9 Kcal
    const carbs = Math.floor(0.43 * tcd) / 4; // 45% de calorías de carbohidratos, 1g de carbohidrato = 4 Kcal

    const macroData :Macro = {
      id_usuario: this.userId,
      calorias: Math.round(tcd),
      proteina: Math.round(protein),
      grasas: Math.round(fat),
      carbohidratos: Math.round(carbs)
    };

    this.macros = macroData

    const consumedCalories = this.meals.reduce((sum, meal) => sum + meal.calorias, 0);
    const consumedProteins = this.meals.reduce((sum, meal) => sum + meal.proteina, 0);
    const consumedFats = this.meals.reduce((sum, meal) => sum + meal.grasa, 0);
    const consumedCarbs = this.meals.reduce((sum, meal) => sum + meal.carbohidratos, 0);

  this.remainingCalories = macroData.calorias - consumedCalories;
  this.remainingProteins = macroData.proteina - consumedProteins;
  this.remainingFats = macroData.grasas - consumedFats;
  this.remainingCarbs = macroData.carbohidratos - consumedCarbs;

    console.log("Mandando: " , macroData)
    this.macrosService.postMacro(macroData).subscribe({
      next: (response) => {
        console.log('Macronutrientes guardados:', response);
      },
      error: (error: HttpErrorResponse) => {
        console.error('Error al guardar los macronutrientes:', error);
      }
    });
  }
}
