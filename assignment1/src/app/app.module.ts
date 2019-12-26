import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TaskComponent} from './task/task.component';
import {NewTaskComponent} from './task/new-task/new-task.component';
import {ShowTaskComponent} from './task/show-task/show-task.component';
import {FormsModule} from '@angular/forms';
import {CheckedTaskDomDirective} from './shared/checked-task-dom.directive';
import {AppRoutingModule} from './app-routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {OwlDateTimeModule, OwlNativeDateTimeModule} from 'ng-pick-datetime';
import {MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule} from '@angular/material';
import {HoverRowTableDirective} from './shared/hover-row-table.directive';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    NewTaskComponent,
    ShowTaskComponent,
    CheckedTaskDomDirective,
    HoverRowTableDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
