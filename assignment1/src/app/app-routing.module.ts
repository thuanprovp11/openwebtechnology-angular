import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule, Routes} from '@angular/router';
import {TaskComponent} from './task/task.component';
import {ShowTaskComponent} from './task/show-task/show-task.component';

const router: Routes = [
  {path: '', component: TaskComponent},
  {path: 'tasks', component: ShowTaskComponent}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(router)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
}
