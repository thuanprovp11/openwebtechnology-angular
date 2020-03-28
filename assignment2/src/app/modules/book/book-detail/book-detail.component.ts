import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BookModel, BookService } from '../book.service';
import { BookDetailService } from './book-detail.service';
import { SnackBarComponent } from '../../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DialogComponent } from '../../../shared/dialog/dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  currentBook: BookModel;
  idBook: string;

  constructor(private router: ActivatedRoute, private bookService: BookService, private route: Router,
              private bookDetailService: BookDetailService, private snackBar: MatSnackBar, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.router.params.subscribe(id => {
      this.idBook = id.id;
      this.bookService.getBookDetailById(id.id).subscribe(book => {
        this.currentBook = book;
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
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '350px',
      data: {
        question: 'Are you sure want to delete book with id is ' + this.idBook + ' ?'
      }
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data) {
        this.bookDetailService.onDeleteBookById(this.idBook).subscribe(res => {
          this.onShowSnackBar({message: 'Deleted Success!!', isSuccess: true}, 5000);
          this.route.navigate(['../']);
        });
      }
    });
  }
}
