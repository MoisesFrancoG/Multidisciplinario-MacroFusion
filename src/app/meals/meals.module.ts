import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MealsRoutingModule } from './meals-routing.module';
import { MealsDashboardComponent } from './meals-dashboard/meals-dashboard.component';


@NgModule({
  declarations: [
    MealsDashboardComponent
  ],
  imports: [
    CommonModule,
    MealsRoutingModule
  ],
  exports:[
    
  ]
})
export class MealsModule { }
