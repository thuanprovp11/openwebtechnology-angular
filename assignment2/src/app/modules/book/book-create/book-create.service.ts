import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  onEditBookById(id, data) {
    return this.http.put('https://books-234.herokuapp.com/api/books/' + id, data);
  }
}
