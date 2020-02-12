import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-dialog-mat',
  templateUrl: './dialog-mat.component.html',
})
export class DialogMatComponent {

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }


}
