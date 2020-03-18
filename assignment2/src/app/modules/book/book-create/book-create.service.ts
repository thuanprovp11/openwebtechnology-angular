import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '../../../shared/user.model';
import { catchError, tap } from 'rxjs/operators';
import { LoginData } from '../../../core/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class BookCreateService {

  constructor(private http: HttpClient) {

  }

  onCreateNewBook(data) {
    data.enable = true;
    console.log(data);
    return this.http.post('https://books-234.herokuapp.com/api/books', data);
  }
}
