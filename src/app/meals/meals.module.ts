import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsDashboardComponent } from './meals-dashboard/meals-dashboard.component';
import { FoodModalComponent } from './food-modal/food-modal.component';
import { FooddetailModalComponent } from './fooddetail-modal/fooddetail-modal.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    MealsDashboardComponent,
    FoodModalComponent,
    FooddetailModalComponent,
  ],
  imports: [
    CommonModule,
    MealsRoutingModule,
    FormsModule
  ],
  exports:[

  ]
})
export class MealsModule { }
