import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesSectionComponent } from './exercises-section/exercises-section.component';
import { ExerciseDetailComponent } from './exercise-detail/exercise-detail.component';
import { FormsModule } from '@angular/forms';
import { EjercicioCardComponent } from './ejercicio-card/ejercicio-card.component';
import { RoutinesSectionComponent } from './routines-section/routines-section.component';
import { RoutinesDetailComponent } from './routines-detail/routines-detail.component';


@NgModule({
  declarations: [
    ExercisesSectionComponent,
    ExerciseDetailComponent,
    EjercicioCardComponent,
    RoutinesSectionComponent,
    RoutinesDetailComponent
  ],
  imports: [
    CommonModule,
    ExercisesRoutingModule
  ],
  exports:[
    ExercisesSectionComponent
  ]
})
export class ExercisesModule { }
