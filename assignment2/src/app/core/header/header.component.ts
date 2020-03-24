import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Subscription } from 'rxjs';
import { HeaderService } from './header.service';

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

  constructor(private authService: AuthService, private headerService: HeaderService) {
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

  onOpenSideBar() {
    this.headerService.onOpenSideBar();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
    this.userNameSub.unsubscribe();
  }
}
