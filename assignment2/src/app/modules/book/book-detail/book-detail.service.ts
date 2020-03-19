import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookDetailService {
  constructor(private http: HttpClient) {
  }

  onDeleteBookById(id) {
    return this.http.delete('https://books-234.herokuapp.com/api/books/' + id);
  }
}
