import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BookRoutingModule } from './book-routing.module';
import { BookListComponent } from './book-list/book-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BookCreateComponent } from './book-create/book-create.component';
import { BookComponent } from './book.component';
import { SharedMaterialModule } from '../../shared/shared-material.module';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    BookListComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedMaterialModule,
    BookRoutingModule
  ],
  exports: [],
})
export class BookModule {

}
