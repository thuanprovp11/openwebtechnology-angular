import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';

const bookRouter: Routes = [{
  path: '', component: BookComponent, children: [
    {path: 'book-list', component: BookListComponent},
    {path: 'book-detail/:id', component: BookDetailComponent},
    {path: 'new', component: BookCreateComponent},
    {path: 'edit/:id', component: BookCreateComponent}
  ]
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(bookRouter)
  ],
  exports: [
    RouterModule
  ]
})
export class BookRoutingModule {

}
