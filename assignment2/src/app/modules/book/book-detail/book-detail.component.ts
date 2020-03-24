import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookModel, BookService } from '../book.service';
import { BookDetailService } from './book-detail.service';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  currentBook: BookModel;
  idBook: string;

  constructor(private router: ActivatedRoute, private bookService: BookService,
              private bookDetailService: BookDetailService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(id => {
      this.idBook = id.id;
      this.bookService.getBookDetailById(id.id).subscribe(book => {
        this.currentBook = book;
        console.log(this.currentBook.userDTO.email);
      });
    });
  }

  onShowSnackBar(dataShow, timeDuration) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      data: dataShow
    });
  }

  onDeleteBook() {
    const result = confirm('Are you sure to delete this book?');
    if (result) {
      this.bookDetailService.onDeleteBookById(this.idBook).subscribe(res => {
        this.onShowSnackBar({message: 'Delete book successs', isSuccess: true}, 5000);
      });
    }
  }
}
