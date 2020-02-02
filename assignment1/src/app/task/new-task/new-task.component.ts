import { Component, OnInit } from '@angular/core';
import { ListTasks, Task } from '../../shared/task.model';
import { TaskService } from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  newCurrentTasks: ListTasks;

  constructor(private taskService: TaskService) {
    this.newCurrentTasks = this.taskService.defaultListTask;
  }

  ngOnInit() {
  }

  onAddNewTask() {
    this.newCurrentTasks.tasks.push(new Task('', new Date(), 'available', new Date()));
  }

  onRemoveTask(id) {
    if (this.newCurrentTasks.tasks.length === 1) {
      alert(`Can't remove last item`);
    } else {
      this.newCurrentTasks.tasks.splice(id, 1);
    }
  }

  onSaveListTask() {
    this.taskService.onAddNewListTask(this.newCurrentTasks);
    alert('Save success!');
  }

  onChangeStatus(id: number, status: string) {
    this.newCurrentTasks.tasks[id].status = status;
  }
}
