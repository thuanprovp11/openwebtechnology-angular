import {Component, OnInit} from '@angular/core';
import {Task} from '../../shared/task.model';
import {TaskService} from '../task.service';

@Component({
  selector: 'app-new-task',
  templateUrl: './new-task.component.html',
  styleUrls: ['./new-task.component.css']
})
export class NewTaskComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: false
  };

  constructor(private taskService: TaskService) {
  }

  ngOnInit() {
  }

  onClearFields() {
    this.task.title = '';
    this.task.description = '';
  }

  onCreateNewTask() {
    this.taskService.onCreateListTask({title: this.task.title, description: this.task.description, status: false});
  }
}
