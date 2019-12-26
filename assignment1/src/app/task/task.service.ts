import {EventEmitter, Injectable} from '@angular/core';
import {ListTasks} from '../shared/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  editEvent = new EventEmitter<ListTasks>();
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

  onRemoveAllTask() {
    localStorage.removeItem('database');
    this.listTask = this.onGetListTask();
  }

  onAddNewListTask(newListTask: ListTasks) {
    this.listTask.push(newListTask);
    this.onSetListTask();
    this.listTask = this.onGetListTask();
  }

  onConvertData(dataSource) {
    dataSource = dataSource.map(x => {
      let arr = [];
      arr = x.tasks.map(c => {
        let obj = {};
        obj['category'] = x.categoryName;
        obj['name'] = c.name;
        obj['status'] = c.status;
        obj['createAt'] = c.createdAt;
        obj['deadline'] = c.deadline;
        return obj;
      });
      return arr;
    });
    return [].concat.apply([], dataSource);
  }
}
