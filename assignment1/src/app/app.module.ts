import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { TaskComponent } from './task/task.component';
import { NewTaskComponent } from './task/new-task/new-task.component';
import { ShowTaskComponent } from './task/show-task/show-task.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CheckedTaskDomDirective } from './shared/checked-task-dom.directive';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { MatFormFieldModule, MatInputModule, MatPaginatorModule, MatSortModule, MatTableModule } from '@angular/material';
import { HoverRowTableDirective } from './shared/hover-row-table.directive';
import { NewTaskGoogleKeepUiComponent } from './task/new-task-google-keep-ui/new-task-google-keep-ui.component';
import { TaskCardSelectedDirective } from './shared/task-card-selected.directive';
import { PopUpComponent } from './pop-up/pop-up.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    NewTaskComponent,
    ShowTaskComponent,
    CheckedTaskDomDirective,
    HoverRowTableDirective,
    NewTaskGoogleKeepUiComponent,
    TaskCardSelectedDirective,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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
