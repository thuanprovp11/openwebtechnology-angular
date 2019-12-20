import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {HeaderComponent} from './header/header.component';
import {TaskComponent} from './task/task.component';
import {NewTaskComponent} from './task/new-task/new-task.component';
import {EditTaskComponent} from './task/edit-task/edit-task.component';
import {ShowTaskComponent} from './task/show-task/show-task.component';
import {FormsModule} from '@angular/forms';
import {RouterModule, Routes} from '@angular/router';
import { CheckedTaskDomDirective } from './shared/checked-task-dom.directive';

const router: Routes = [
  {path: '', component: TaskComponent},
  {path: 'tasks', component: ShowTaskComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TaskComponent,
    NewTaskComponent,
    EditTaskComponent,
    ShowTaskComponent,
    CheckedTaskDomDirective
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(router)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
