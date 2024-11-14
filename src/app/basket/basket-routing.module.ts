import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketDashboardComponent } from './basket-dashboard/basket-dashboard.component';
import { AddFoodComponent } from './add-food/add-food.component';

const routes: Routes = [
  { path: '', component: BasketDashboardComponent },
  { path: 'canasta', component: BasketDashboardComponent },
  { path: 'add-food', component: AddFoodComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BasketRoutingModule { }
