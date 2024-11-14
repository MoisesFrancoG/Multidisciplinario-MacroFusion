import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { HomeComponent } from './auth/home/home.component';
import { UserDashboardComponent } from './user/user-dashboard/user-dashboard.component';
import { ExercisesSectionComponent } from './exercises/exercises-section/exercises-section.component';
import { MealsDashboardComponent } from './meals/meals-dashboard/meals-dashboard.component';
import { BasketDashboardComponent } from './basket/basket-dashboard/basket-dashboard.component';
import { AddFoodComponent } from './basket/add-food/add-food.component';
import { UserProfileComponent } from './user/user-profile/user-profile.component';
import { EditProfileComponent } from './user/edit-profile/edit-profile.component';

// const routes: Routes = [
//   { path: '', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//   { path: 'login', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) },
//   { path: 'dashboard', loadChildren: () => import('./user/user.module').then(m => m.UserModule) },
//   // { path: '', redirectTo: '/login', pathMatch: 'full' },
//   // { path: '**', redirectTo: '/login' }
// ];

const routes: Routes = [
  // RUTA PRINCIPAL
  { path: '', redirectTo: '', pathMatch: 'full' },

  // RUTAS DE AUTENTICACIÓN
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  // RUTAS DE USUARIO
  { path: 'dashboard', component: UserDashboardComponent },
  { path: 'personal-info', component: UserProfileComponent },
  { path: 'edit-profile', component: EditProfileComponent },
  // Puedes agregar más rutas para otros componentes de usuario si es necesario

  //RUTAS EJERCICIOS
  { path: 'ejercicios', component: ExercisesSectionComponent},

  // RUTAS COMIDAS
  { path: 'comidas', component: MealsDashboardComponent },

  // RUTAS CANASTA
  { path: 'canasta', component: BasketDashboardComponent },
  { path: 'add-food', component: AddFoodComponent }

  // RUTA COMODÍN
  // { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
