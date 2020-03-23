import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
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
export class AuthService {
  userStored = new BehaviorSubject<UserModel>(null);
  userNameStored = new BehaviorSubject<string>(null);

  constructor(private http: HttpClient) {
  }

  login(data: LoginData) {
    return this.http.post<UserModel>('https://books-234.herokuapp.com/api/auth/login', data)
      .pipe(catchError(this.handleError), tap(this.storeUserLogin.bind(this)));
  }

  signup(data: SignUpData) {
    return this.http.post('https://books-234.herokuapp.com/api/auth/sign_up', data).pipe(catchError(this.handleError));
  }

  autoLogin() {
    const userData:
      { role: string, id: number, token: string, expToken: string } = this.loadedUserLogin();
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(userData.role, userData.id, userData.token, new Date(userData.expToken));
    this.userStored.next(loadedUser);
    if (!loadedUser.getTokenUser) {
      this.autoLogout();
    }
    this.userNameStored.next(this.decodeToken(loadedUser.getTokenUser).sub); // bind user from decode token to navbar
  }

  private autoLogout() {
    this.logout();
  }

  private handleError(error: HttpErrorResponse) {
    if (!error.error || !error.error.message) {
      return throwError('Ops! Something error happened !');
    }
    return throwError(error.error.message);
  }

  loadedUserLogin() {
    return JSON.parse(localStorage.getItem('userLogin'));
  }

  private storeUserLogin(resData) {
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    const userData = new UserModel(resData.role, resData.id, resData.token, expDate);
    this.userStored.next(userData);
    localStorage.setItem('userLogin', JSON.stringify(userData));
    const tokenDecode = this.decodeToken(userData.getTokenUser);
    this.userNameStored.next(tokenDecode.sub); // send userName to header component
  }

  decodeToken(token) {
    return jwt_decode(token);
  }

  logout() {
    this.userNameStored.next(null);
    this.userStored.next(null);
    localStorage.removeItem('userLogin');
  }
}
