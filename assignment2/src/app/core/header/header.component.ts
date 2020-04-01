import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import * as JWT from 'node_modules/jwt-decode';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {

  isAuthentication = false;
  userSub: Subscription;

  constructor(public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.userStored.subscribe(user => {
      if (user == null) {
        return;
      }
      this.isAuthentication = !!user;
      console.log(user.getTokenUser);
      // JWT(user.getTokenUser);
      // console.log(JWT(user.getTokenUser));
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '300px',
    });
    dialogRef.updatePosition({
      top: '20vh',
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
