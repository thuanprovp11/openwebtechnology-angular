import { Injectable } from '@angular/core';
import { ListTasks } from '../shared/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  newListTask = new Subject<ListTasks[]>();
  listTask: ListTasks[] = this.onGetListTask();

  constructor() {
  }

  onGetListTask(): ListTasks[] {
    return JSON.parse(localStorage.getItem('database') || '[]');
  }

  onSetListTask() {
    localStorage.setItem('database', JSON.stringify(this.listTask));
  }

  onSaveAndBindingNewListTask() {
    this.onSetListTask();
    this.newListTask.next(this.listTask);
  }

  onCheckPropertyExits(idListTask: number, idTask: number = -1) {
    if (idTask === -1) {
      return this.listTask[idListTask];
    } else {
      return !(!this.listTask[idListTask] || !this.listTask[idListTask].tasks[idTask]);
    }
  }

  onChangeStatusTaskById(idListTask: number, idTask: number, newStatus: string) {
    if (this.onCheckPropertyExits(idListTask, idTask)) {
      this.listTask[idListTask].tasks[idTask].status = newStatus;
      this.onSaveAndBindingNewListTask();
    } else {
      alert('id not valid!!!');
    }
  }

  onEditTaskByName(idListTask: number, idTask: number, name: string) {
    if (this.onCheckPropertyExits(idListTask, idTask)) {
      this.listTask[idListTask].tasks[idTask].name = name;
      this.onSaveAndBindingNewListTask();
    } else {
      alert('id not valid!!!');
    }
  }

  onPushNewTask(idListTask: number, newTask) {
    if (this.onCheckPropertyExits(idListTask)) {
      this.listTask[idListTask].tasks.push(newTask);
      this.onSaveAndBindingNewListTask();
    } else {
      alert('id not valid!!!');
    }
  }

  onRemoveAllTask() {
    localStorage.removeItem('database');
    this.listTask = this.onGetListTask();
    this.newListTask.next(this.listTask);
  }

  onRemoveListTaskById(id: number) {
    this.listTask.splice(id, 1);
    this.onSaveAndBindingNewListTask();
  }

  onRemoveTaskById(idListTask: number, idTask: number) {
    if (this.onCheckPropertyExits(idListTask, idTask)) {
      if (this.listTask[idListTask].tasks.length <= 1) {
        this.onRemoveListTaskById(idListTask);
        this.onSaveAndBindingNewListTask();
      } else {
        this.listTask[idListTask].tasks.splice(idTask, 1);
        this.onSaveAndBindingNewListTask();
      }
    } else {
      alert('not valid!!!');
    }
  }

  onAddNewListTask(newListTask: ListTasks) {
    this.listTask.push(newListTask);
    this.onSaveAndBindingNewListTask();
  }

  onConvertData(dataSource) {
    dataSource = dataSource.map(x => {
      // let arr = [];
      return x.tasks.map(c => {
        return {
          category: x.categoryName,
          name: c.name,
          status: c.status,
          createAt: c.createdAt,
          deadline: c.deadline
        };
      });
    });
    return [].concat.apply([], dataSource);
  }
}
