import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
// import { NgForm } from '@angular/forms';
import { FoodService } from '../../services/food.service';
import { Food } from '../../models/food';



@Component({
  selector: 'app-add-food',
  templateUrl: './add-food.component.html',
  styleUrl: './add-food.component.css'
})
export class AddFoodComponent {

  editMode: boolean = false; // Decide si el formulario es para editar o agregar
  foodId: number = 0;

  food: Food = {
    idalimentos: 0,
    id_usuario: parseInt(localStorage.getItem('user_id') || '0', 10),
    nombre: '',
    marca: '',
    calorias: 0,
    proteina: 0,
    carbohidratos: 0,
    grasa: 0,
    porcion: 100,
    tipomedida: 'gr',
    categoria: ''
  };

  constructor(
    private foodService: FoodService,
    public router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.foodId = +this.route.snapshot.params['id'];
    if (this.foodId) {
      this.editMode = true;
      this.foodService.getFoodById(this.foodId).subscribe(food => {
        this.food = food;
      });
    }
  }

  addOrUpdateFood() {
    if (this.editMode) {
      this.foodService.updateFood(this.foodId, this.food).subscribe({
        next: () => {
          alert('Alimento actualizado con éxito');
          this.router.navigate(['/canasta']);
        },
        error: error => {
          console.error('Error actualizando el alimento:', error);
          alert('Error al actualizar alimento');
        }
      });
    } else {
      this.foodService.addFood(this.food).subscribe({
        next: () => {
          alert('Alimento agregado con éxito');
          this.router.navigate(['/canasta']);
        },
        error: error => {
          console.error('Error agregando el alimento:', error);
          alert('Error al agregar alimento');
        }
      });
    }
  }


}
