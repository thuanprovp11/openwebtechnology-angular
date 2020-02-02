import { Injectable } from '@angular/core';
import { ListTasks } from '../shared/task.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  newListTask = new Subject<ListTasks[]>();
  listTask: ListTasks[] = this.onGetListTask();
  defaultListTask: ListTasks = {
    categoryName: 'category 1',
    tasks: [{name: 'task 1', deadline: new Date(), createdAt: new Date(), status: 'available'}]
  };

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

  onChangeStatusTaskById(idListTask: number, idTask: number, newStatus: string) {
    this.listTask[idListTask].tasks[idTask].status = newStatus;
    this.onSaveAndBindingNewListTask();
  }

  onEditTaskByName(idListTask: number, idTask: number, name: string) {
    this.listTask[idListTask].tasks[idTask].name = name;
    this.onSaveAndBindingNewListTask();
  }

  onPushNewTask(idListTask: number, newTask) {
    this.listTask[idListTask].tasks.push(newTask);
    this.onSaveAndBindingNewListTask();
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
    if (this.listTask[idListTask].tasks.length === 1) {
      this.onRemoveListTaskById(idListTask);
      this.onSaveAndBindingNewListTask();
    } else {
      this.listTask[idListTask].tasks.splice(idTask, 1);
      this.onSaveAndBindingNewListTask();
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
