import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../auth/auth.component';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isAuthentication = false;
  userNameSub: Subscription;
  userSub: Subscription;
  username: string;

  constructor(public dialog: MatDialog, private authService: AuthService) {
  }

  ngOnInit(): void {
    this.userSub = this.authService.userStored.subscribe(user => {
      this.isAuthentication = !!user;
    });
    this.userNameSub = this.authService.userNameStored.subscribe(username => {
      this.username = username;
    });
  }

  onLogout() {
    this.authService.logout();
  }

  openDialogLogin() {
    const dialogRef = this.dialog.open(AuthComponent, {
      width: '300px',
    });
    dialogRef.updatePosition({
      top: '20vh',
    });
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.userNameSub.unsubscribe();
  }
}
