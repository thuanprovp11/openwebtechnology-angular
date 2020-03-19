import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BookCreateService } from './book-create.service';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;

  constructor(private bookCreateService: BookCreateService) {
  }

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(null, Validators.required),
      description: new FormControl(null, Validators.required),
      content: new FormControl(null, Validators.required),
      author: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    this.bookCreateService.onCreateNewBook(this.bookForm.value).subscribe(data => {
      console.log(data);
    });
  }

  onClear() {
    this.bookForm.reset();
  }
}
