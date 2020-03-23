import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookListService {
  constructor(private http: HttpClient) {
  }

  enableBookById(id) {
    return this.http.put('https://books-234.herokuapp.com/api/books/enable/' + id, '');
  }

  deleteBookById(id) {
    return this.http.delete('https://books-234.herokuapp.com/api/books/' + id);
  }
}
