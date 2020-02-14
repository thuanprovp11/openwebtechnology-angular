import { Component, OnInit, ViewChild } from '@angular/core';
import { TaskService } from '../task.service';
import { Router } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

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


  constructor(private taskService: TaskService) {
    console.log('Prototype', this.dataSource);
  }

  ngOnInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.taskService.newListTask.subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.taskService.onConvertData(data));
    });
  }

  onClear() {
    const result = confirm('Do you want to delete all tasks?');
    if (result) {
      this.taskService.onRemoveAllTask();
    }
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  isOverTime(data) {
    return new Date(data.deadline) < new Date() && data.status !== 'done';
  }
}
