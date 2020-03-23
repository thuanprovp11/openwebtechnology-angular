import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, Subject, throwError } from 'rxjs';
import { UserModel } from '../../shared/user.model';
import * as jwt_decode from 'node_modules/jwt-decode';

export interface LoginData {
  email: string;
  password: string;
}

export interface SignUpData {
  email: string;
  password: string;
  fullName: string;
  birthday: Date;
}

@Injectable({
  providedIn: 'root'
})
export class HeaderService {
  openSidebar = new Subject();

  constructor() {
  }

  onOpenSideBar() {
    this.openSidebar.next('');
  }
}
