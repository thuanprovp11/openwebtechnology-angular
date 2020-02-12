import { Component, OnInit } from '@angular/core';
import { DialogMatComponent } from '../../shared/dialog-mat/dialog-mat.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog) {
  }

  ngOnInit(): void {
  }

  openDialog() {
    const dialogRef = this.dialog.open(DialogMatComponent, {
      width: '300px',
    });
    dialogRef.updatePosition({
      top: '20vh',
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('test closed!');
    });
  }
}
