import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

interface BookResponse {
  amount: number;
  books: [];
}

export interface BookModel {
  id: number;
  title: string;
  description: string;
  content: string;
  author: string;
  createdAt: Date;
  updatedAt: Date;
  userDTO: {
    email: string;
  };
}

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, private snackBar: MatSnackBar) {
  }

  getBookList() {
    return this.http.get<BookResponse>('https://books-234.herokuapp.com/api/books').pipe(catchError(err => throwError('error')));
  }

  getBookDetailById(id: string) {
    return this.http.get<BookModel>('https://books-234.herokuapp.com/api/books/' + id);
  }

  onShowSnackBar(dataShow, timeDuration) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      data: dataShow
    });
  }
}
