import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserModel} from '../../shared/user.model';
import * as jwt_decode from 'node_modules/jwt-decode';

export interface LoginData {
  email: string;
  password: string;
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

  autoLogin() {
    const userData:
      { role: string, id: number, token: string, expToken: string } = JSON.parse(localStorage.getItem('userLogin'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(userData.role, userData.id, userData.token, new Date(userData.expToken));
    console.log(loadedUser);
  }

  private handleError(error: HttpErrorResponse) {
    if (!error.error || !error.error.message) {
      return throwError('Ops! Something error happened !');
    }
    return throwError(error.error.message);
  }

  private storeUserLogin(resData) {
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    const userData = new UserModel(resData.role, resData.id, resData.token, expDate);
    this.userStored.next(userData);
    localStorage.setItem('userLogin', JSON.stringify(userData));
    const tokenDecode = jwt_decode(userData.getTokenUser);
    this.userNameStored.next(tokenDecode.sub); // send userName to header component
  }

  logout() {
    this.userNameStored.next(null);
    this.userStored.next(null);
    localStorage.removeItem('userLogin');
  }

}
