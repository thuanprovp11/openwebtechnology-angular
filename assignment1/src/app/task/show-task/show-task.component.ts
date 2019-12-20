import {Component, OnInit} from '@angular/core';
import {TaskService} from '../task.service';
import {Task} from '../../shared/task.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})
export class ShowTaskComponent implements OnInit {
  listTask: Task[];

  constructor(private taskService: TaskService, private router: Router) {
  }

  ngOnInit() {
    this.listTask = this.taskService.onGetListTask();
  }

  onClear() {
    localStorage.removeItem('test');
    this.router.navigateByUrl('/tasks', { skipLocationChange: true }).then(() => {
      this.router.navigate(['tasks']);
    });
  }
}
