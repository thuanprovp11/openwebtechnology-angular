import { Component, OnInit, ViewChild } from '@angular/core';
import { BookModel, BookService } from '../../../shared/book.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  listBooks: BookModel[] = [];
  displayedColumns: string[] = ['id', 'title', 'author', 'description', 'createdBy', 'status', 'action'];
  dataSource;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private bookListService: BookService) {
  }


  ngOnInit(): void {
    this.bookListService.getBookList().subscribe(data => {
      this.listBooks = data.books;
      this.dataSource = new MatTableDataSource(data.books);
      this.dataSource.sort = this.sort;
      console.log(this.listBooks);
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

}
