import {Injectable, EventEmitter, OnInit} from '@angular/core';
import {Task} from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  listTask: Task[] = this.onGetListTask();

  constructor() {

  }

  onGetListTask(): Task[] {
    return JSON.parse(localStorage.getItem('test') || '[]');
  }

  onSetListTask() {
    localStorage.setItem('test', JSON.stringify(this.listTask));
  }

  onCreateListTask(newTask: Task) {
    this.listTask.push(newTask);
    this.onSetListTask();
  }

  onChangeStatusTask(id: number) {
    this.listTask[id].status = !this.listTask[id].status;
    this.onSetListTask();
  }
}
