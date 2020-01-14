import {Injectable} from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import {AuthService} from './auth.service';
import {exhaustMap, take} from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return this.authService.userStored.pipe(take(1), exhaustMap(user => {
        if (!user) {
          return next.handle(req);
        }
        const modifyRequest = req.clone({params: new HttpParams().set('auth', user.tokenUser)});
        return next.handle(modifyRequest);
      }
    ));
  }
}
