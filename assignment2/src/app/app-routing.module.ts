import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './modules/book/book.component';
import { BookListComponent } from './modules/book/book-list/book-list.component';
import { BookDetailComponent } from './modules/book/book-detail/book-detail.component';


const appRouter: Routes = [
  {path: '', redirectTo: 'book', pathMatch: 'full'},
  {
    path: 'book', component: BookComponent, children: [
      {path: 'book-list', component: BookListComponent},
      {path: 'book-detail/:id', component: BookDetailComponent}
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
