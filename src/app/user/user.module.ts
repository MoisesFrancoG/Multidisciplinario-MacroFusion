import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserRoutingModule } from './user-routing.module';
import { UserDashboardComponent } from './user-dashboard/user-dashboard.component';
import { User } from '../../models/user.model';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';

const routes: Routes = [
  { path: 'dashboard', component: UserDashboardComponent }
];

@NgModule({
  declarations: [
    UserDashboardComponent,
    UserProfileComponent,
    EditProfileComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    // RouterModule.forChild(routes)
  ],
  exports: [
    UserDashboardComponent,
  ]
})
export class UserModule { }
