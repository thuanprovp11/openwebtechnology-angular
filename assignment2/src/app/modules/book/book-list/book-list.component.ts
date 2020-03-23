import { Component, OnInit, ViewChild } from '@angular/core';
import { BookService } from '../book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { BookListService } from './book-list.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  displayedColumns: string[] = ['id', 'title', 'author', 'description', 'userDTO.email', 'enabled', 'action'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookService: BookService, private bookListService: BookListService) {
  }


  ngOnInit(): void {
    this.bookService.getBookList().subscribe(data => {
      this.dataSource = new MatTableDataSource(data.books);
      this.dataSource.sort = this.sort;
    });
  }

  onDeleteBookById(id) {
    this.bookListService.deleteBookById(id).subscribe(data => {
      this.refreshTable();
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
      this.refreshTable();
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
