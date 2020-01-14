import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {catchError, tap} from 'rxjs/operators';
import {BehaviorSubject, throwError} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';

export interface User {
  email: string;
  password: string;
  returnSecureToken: boolean;
}

export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userStored = new BehaviorSubject<UserModel>(null);

  constructor(private http: HttpClient, private router: Router) {
  }

  autoLogin() {
    const userData:
      { email: string, id: string, token: string, tokenExpirationDate: string } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }
    const loadedUser = new UserModel(userData.email, userData.id, userData.token, new Date(userData.tokenExpirationDate));
    // console.log(userData);
    if (loadedUser.tokenUser) {
      this.userStored.next(loadedUser);
    }
  }

  signUp(data: User) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDnAvAYxMzBNhAzIPIv5TzfICyMn3W_UU8',
      data).pipe(catchError(this.handleError), tap(this.storeNewUser.bind(this)));
  }

  login(data: User) {
    return this.http.post<AuthResponseData>(
      'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDnAvAYxMzBNhAzIPIv5TzfICyMn3W_UU8',
      data).pipe(catchError(this.handleError), tap(this.storeNewUser.bind(this)));
  }

  logout() {
    this.userStored.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
  }

  private storeNewUser(resData) {
    const user = new UserModel(resData.email, resData.localId, resData.idToken, new Date(Date.now() + Number(resData.expiresIn) * 1000));
    this.userStored.next(user);
    localStorage.setItem('userData', JSON.stringify(user));
  }

  private handleError(err: HttpErrorResponse) {
    if (!err.error || !err.error.error) {
      return throwError('Error occurred unknowns!');
    }
    switch (err.error.error.message) {
      case 'EMAIL_EXISTS':
        return throwError('Email already exits!');
      case 'TOO_MANY_ATTEMPTS_TRY_LATER':
        return throwError('Too many request, please send later!');
      case 'EMAIL_NOT_FOUND':
        return throwError('Account not exits!');
      case 'USER_DISABLED':
        return throwError('Your account was banned!');
      case 'INVALID_PASSWORD':
        return throwError('Email or password invalid!');
      default:
        return throwError('Error occurred unknowns!');
    }
  }
}
