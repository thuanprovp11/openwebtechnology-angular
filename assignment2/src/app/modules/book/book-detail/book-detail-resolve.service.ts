import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BookModel, BookService } from '../book.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BookDetailResolveService implements Resolve<BookModel> {
  constructor(private bookService: BookService) {

  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<BookModel> | Promise<BookModel> | BookModel {
    return this.bookService.getBookDetailById(route.params.id);
  }

}
