import {Component, OnInit} from '@angular/core';
import {BookModel, BookService} from '../../../shared/book.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})
export class BookListComponent implements OnInit {
  listBooks: BookModel[] = [];

  constructor(private bookListService: BookService) {
  }

  ngOnInit(): void {
    this.bookListService.getBookList().subscribe(data => {
      this.listBooks = data.books;
      console.log(this.listBooks);
    });
  }

}
