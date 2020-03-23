import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel, BookService } from '../book.service';
import { BookDetailService } from './book-detail.service';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  currentBook: BookModel;
  idBook: string;

  constructor(private router: ActivatedRoute, private bookService: BookService, private bookDetailService: BookDetailService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(id => {
      this.idBook = id.id;
      this.bookService.getBookDetailById(id.id).subscribe(book => {
        this.currentBook = book;
      });
    });
  }

  onDeleteBook() {
    const result = confirm('Are you sure to delete this book?');
    if (result) {
      this.bookDetailService.onDeleteBookById(this.idBook).subscribe(res => {
        alert('success!!!');
      });
    }
  }
}
