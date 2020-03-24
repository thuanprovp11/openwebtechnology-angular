import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookCreateService } from './book-create.service';
import { ActivatedRoute, Params } from '@angular/router';
import { BookService } from '../book.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;
  idBook: string;
  isAllowEdit = false;
  defaultDataFieldsForm = {
    title: '',
    description: '',
    content: '',
    author: '',
  };

  constructor(private bookCreateService: BookCreateService, private routeActive: ActivatedRoute,
              private bookService: BookService) {
  }

  ngOnInit(): void {
    this.routeActive.params.subscribe((params: Params) => {
      // check params.id must be number and not null
      this.isAllowEdit = (!isNaN(Number(params.id)) && +params.id != null);
      this.idBook = params.id;
      // go to edit book
      if (this.isAllowEdit) {
        const bookObservable: Observable<any> = this.onGetBookByID(params.id);
        bookObservable.subscribe(data => {
          this.defaultDataFieldsForm.title = data.title;
          this.defaultDataFieldsForm.description = data.description;
          this.defaultDataFieldsForm.content = data.content;
          this.defaultDataFieldsForm.author = data.author;
          this.initFormBook();
        });
      }
      // go to create new book
      this.initFormBook();
    });
  }

  private initFormBook() {
    this.bookForm = new FormGroup({
      title: new FormControl(this.defaultDataFieldsForm.title, Validators.required),
      description: new FormControl(this.defaultDataFieldsForm.description, Validators.required),
      content: new FormControl(this.defaultDataFieldsForm.content, Validators.required),
      author: new FormControl(this.defaultDataFieldsForm.author, Validators.required),
    });
  }

  onGetBookByID(id) {
    return this.bookService.getBookDetailById(id);
  }

  onSubmit() {
    if (this.bookForm.invalid) {
      return;
    }
    if (this.isAllowEdit) {
      this.bookCreateService.onEditBookById(this.idBook, this.bookForm.value).subscribe(data => {
        this.bookService.onShowSnackBar({message: 'Book with id ' + this.idBook + ' was updated!!!', isSuccess: true}, 5000);
      });
    } else {
      this.bookCreateService.onCreateNewBook(this.bookForm.value).subscribe(data => {
        this.bookService.onShowSnackBar({message: 'Book was created!!!', isSuccess: true}, 5000);
      });
    }
  }

  onClear() {
    this.bookForm.reset();
  }
}
