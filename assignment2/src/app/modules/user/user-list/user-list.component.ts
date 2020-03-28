import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { UserListService } from './user-list.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit, OnDestroy {
  displayedColumns: string[] = ['id', 'email', 'fullName', 'birthday', 'enabled', 'role', 'action'];
  dataSource;
  userListSub: Subscription;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private userListService: UserListService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.userListSub = this.userListService.onGetListUser().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  onRefreshTable() {
    this.userListService.onGetListUser().subscribe(data => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.sort = this.sort;
    });
  }

  onEditStatusUserById(id, currentStatus) {
    const data = {enabled: !currentStatus};
    this.userListService.onUpdateStatusUserById(id, data).subscribe(res => {
      this.onShowSnackBar({message: 'Update status of user with ' + id + ' success!!!', isSuccess: true}, 5000);
      this.onRefreshTable();
    });
  }

  onShowSnackBar(dataShow, timeDuration) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      data: dataShow
    });
  }

  onDeleteUserById(id) {
    this.userListService.onDeleteUserById(id).subscribe(data => {
      this.onShowSnackBar({message: 'User with id ' + id + ' was deleted!!!', isSuccess: true}, 5000);
      this.onRefreshTable();
    });
  }

  ngOnDestroy(): void {
    this.userListSub.unsubscribe();
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
