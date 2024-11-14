import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExercisesRoutingModule } from './exercises-routing.module';
import { ExercisesSectionComponent } from './exercises-section/exercises-section.component';


@NgModule({
  declarations: [
    ExercisesSectionComponent
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
