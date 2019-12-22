import {Component, OnInit} from '@angular/core';
import {Task} from '../../shared/task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.css']
})
export class EditTaskComponent implements OnInit {
  tasks: Task[] = [];

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
    this.tasks = this.taskService.listTask;
  }

  onChangeStatusTask(taskId: number) {
    this.taskService.onChangeStatusTask(taskId);
  }
}
