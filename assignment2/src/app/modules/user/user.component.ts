import { Component, OnInit } from '@angular/core';
import { SnackBarComponent } from '../../shared/snack-bar/snack-bar.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  constructor(private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
  }

  onShowSnackBar(dataShow, timeDuration) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: timeDuration,
      data: dataShow
    });
  }
}
