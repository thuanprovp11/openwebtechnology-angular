import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {BookModel, BookService} from "../../../shared/book.service";
import {HttpClient} from "@angular/common/http";

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  currentBook: BookModel;

  constructor(private router: ActivatedRoute, private bookService: BookService) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(id => {
      console.log(id.id);
      this.bookService.getBookDetailById(id.id).subscribe(book => {
        this.currentBook = book;
      });
    });
  }

}
