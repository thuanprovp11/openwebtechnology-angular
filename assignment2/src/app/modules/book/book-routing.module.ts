import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { BookComponent } from './book.component';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { AuthGuardService } from '../../core/auth/auth.guard.service';
import { BookDetailResolveService } from './book-detail/book-detail-resolve.service';

const bookRouter: Routes = [{
  path: '', canActivate: [AuthGuardService], component: BookComponent, children: [
    {path: 'book-list', component: BookListComponent},
    {path: 'book-detail/:id', component: BookDetailComponent, resolve: [BookDetailResolveService]},
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
