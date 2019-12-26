import {Component, OnInit, ViewChild} from '@angular/core';
import {TaskService} from '../task.service';
import {Router} from '@angular/router';
import {ListTasks} from '../../shared/task.model';
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';

@Component({
  selector: 'app-show-task',
  templateUrl: './show-task.component.html',
  styleUrls: ['./show-task.component.css']
})

export class ShowTaskComponent implements OnInit {
  displayedColumns: string[] = ['order', 'name', 'status', 'deadline', 'createAt', 'category'];
  dataSource = new MatTableDataSource(this.taskService.onConvertData(this.taskService.onGetListTask()));
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;


  constructor(private taskService: TaskService, private router: Router) {
    // this.dataSource = this.taskService.onConvertData(this.taskService.onGetListTask());
    // this.dataSource = new MatTableDataSource(this.dataSource);
    console.log('Prototype', this.dataSource);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  onClear() {
    this.taskService.onRemoveAllTask();
    this.dataSource = new MatTableDataSource(this.taskService.onConvertData(this.taskService.onGetListTask()));
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isOverTime(data) {
    // console.log(data);
    if (new Date(data.deadline) < new Date() && data.status !== 'done') {
      return true;
    } else {
      return false;
    }
  }
}
