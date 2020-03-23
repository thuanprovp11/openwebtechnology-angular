import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BookListService } from './book-list.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'description', 'userDTO.email', 'enabled', 'action'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private bookListService: BookListService, private snackBar: MatSnackBar) {
  }


  ngOnInit(): void {
    this.bookService.getBookList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.books);
      this.dataSource.sort = this.sort;
    });
  }

  onDeleteBookById(id) {
    this.bookListService.deleteBookById(id).subscribe(data => {
      this.onShowSnackBar({message: 'Deleted Success!!', isSuccess: true}, 5000);
      //
      //   this.bookService.onShowSnackBar({message: 'Deleted Success!!', isSuccess: true}, 5000);
      this.refreshTable();
    });
  }

  onShowSnackBar(dataShow, timeDuration) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      data: dataShow
    });
  }

  refreshTable() {
    this.bookService.getBookList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.books);
      this.dataSource.sort = this.sort;
    });
  }

  onEnableBookById(id: string) {
    this.bookListService.enableBookById(id).subscribe(data => {
      this.onShowSnackBar({message: 'Book with id ' + id + ' to enabled!!!', isSuccess: true}, 5000);
      this.refreshTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
