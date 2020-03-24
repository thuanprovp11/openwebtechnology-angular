import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './modules/book/book.component';
import { BookListComponent } from './modules/book/book-list/book-list.component';
import { BookDetailComponent } from './modules/book/book-detail/book-detail.component';
import { UserProfileComponent } from './modules/user/user-profile/user-profile.component';
import { UserComponent } from './modules/user/user.component';
import { BookCreateComponent } from './modules/book/book-create/book-create.component';
import { AuthComponent } from './core/auth/auth.component';
import { UserListComponent } from './modules/user/user-list/user-list.component';


const appRouter: Routes = [
  {path: '', redirectTo: 'book/book-list', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {
    path: 'book', component: BookComponent, children: [
      {path: 'book-list', component: BookListComponent},
      {path: 'book-detail/:id', component: BookDetailComponent},
      {path: 'new', component: BookCreateComponent},
      {path: 'edit/:id', component: BookCreateComponent}
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      {path: 'user-profile', component: UserProfileComponent},
      {path: 'user-profile/edit/:id', component: UserProfileComponent},
      {path: 'user-list', component: UserListComponent}
    ]
  }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(appRouter)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
