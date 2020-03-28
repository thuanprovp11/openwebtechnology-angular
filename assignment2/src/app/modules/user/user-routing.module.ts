import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserListComponent } from './user-list/user-list.component';
import { AuthGuardService } from '../../core/auth/auth.guard.service';

const userRouter: Routes = [{
  path: '', canActivate: [AuthGuardService], component: UserComponent, children: [
    {path: 'user-profile', component: UserProfileComponent},
    {path: 'user-profile/edit/:id', component: UserProfileComponent},
    {path: 'user-list', component: UserListComponent}]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(userRouter)
  ],
  exports: [
    RouterModule
  ]
})
export class UserRoutingModule {

}
