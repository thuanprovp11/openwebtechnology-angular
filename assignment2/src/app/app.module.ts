import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './core/header/header.component';
import { FooterComponent } from './core/footer/footer.component';
import { SidebarComponent } from './modules/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { LayoutModule } from '@angular/cdk/layout';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { BookListComponent } from './modules/book/book-list/book-list.component';
import { BookDetailComponent } from './modules/book/book-detail/book-detail.component';
import { BookCreateComponent } from './modules/book/book-create/book-create.component';
import { BookEditComponent } from './modules/book/book-edit/book-edit.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { BookComponent } from './modules/book/book.component';
import { MatCardModule } from '@angular/material/card';
import { AuthComponent } from './core/auth/auth.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogMatComponent } from './shared/dialog-mat/dialog-mat.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    BookListComponent,
    BookDetailComponent,
    BookCreateComponent,
    BookEditComponent,
    BookComponent,
    AuthComponent,
    DialogMatComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatGridListModule,
    MatIconModule,
    LayoutModule,
    MatSidenavModule,
    MatListModule,
    MatExpansionModule,
    MatCardModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
