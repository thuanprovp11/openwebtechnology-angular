import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {BookComponent} from './modules/book/book.component';
import {BookListComponent} from './modules/book/book-list/book-list.component';
import {BookDetailComponent} from './modules/book/book-detail/book-detail.component';
import {UserProfileComponent} from './modules/user/user-profile/user-profile.component';
import {UserComponent} from './modules/user/user.component';


const appRouter: Routes = [
  {path: '', redirectTo: 'book/book-list', pathMatch: 'full'},
  {
    path: 'book', component: BookComponent, children: [
      {path: 'book-list', component: BookListComponent},
      {path: 'book-detail/:id', component: BookDetailComponent}
    ]
  },
  {
    path: 'user', component: UserComponent, children: [
      {path: 'user-profile', component: UserProfileComponent}
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
