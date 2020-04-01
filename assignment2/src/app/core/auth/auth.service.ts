import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { BehaviorSubject, throwError } from 'rxjs';
import { UserModel } from '../../shared/user.model';

export interface LoginData {
  email: string;
  password: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStored = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient) {
  }

  login(data: LoginData) {
    return this.http.post('https://books-234.herokuapp.com/api/auth/login', data)
      .pipe(catchError(this.handleError), tap(this.storeUserLogin.bind(this)));
  }

  private handleError(error: HttpErrorResponse) {
    if (!error.error || !error.error.message) {
      return throwError('Ops! Something caused error!');
    }
    return throwError(error.error.message);
  }

  private storeUserLogin(resData) {
    const expDate = new Date(new Date().getTime() + 3600 * 1000);
    const userData = new UserModel(resData.role, resData.id, resData.token, expDate);
    this.userStored.next(userData);
    localStorage.setItem('userLogin', JSON.stringify(userData));
  }

}
