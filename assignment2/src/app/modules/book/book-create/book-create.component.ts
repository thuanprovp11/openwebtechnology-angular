import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-book-create',
  templateUrl: './book-create.component.html',
  styleUrls: ['./book-create.component.scss']
})
export class BookCreateComponent implements OnInit {
  bookForm: FormGroup;

  constructor() {
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
    console.log(this.bookForm);
  }

  onClear() {
    this.bookForm.reset();
  }
}
