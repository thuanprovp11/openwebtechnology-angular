import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataStorageService} from '../shared-service/data-storage.service';
import {AuthService} from '../auth/auth.service';
import {UserModel} from '../auth/user.model';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {
  isShowMenu = false;
  isShowMenuCollapse = false;
  // currentUser: UserModel;
  userSub: Subscription;
  isAuthenticated = false;

  constructor(private dataStorageService: DataStorageService, private authService: AuthService) {
  }

  ngOnInit() {
    this.userSub = this.authService.userStored.subscribe((data) => {
      // this.currentUser = data;
      this.isAuthenticated = !!data;
    });
  }

  onSaveAllRecipes() {
    this.dataStorageService.onSaveAllRecipes();
  }

  onFetchAllRecipes() {
    this.dataStorageService.onFetchRecipes().subscribe();
  }

  onLogout() {
    this.authService.logout();
  }

  ngOnDestroy(): void {
    this.userSub.unsubscribe();
  }
}
