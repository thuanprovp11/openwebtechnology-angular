import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthResponseData, AuthService, User} from './auth.service';
import {Observable} from 'rxjs';
import {UserModel} from './user.model';
import {Router} from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  myLoginForm: FormGroup;
  isLoading = false;
  // currentUser: UserModel;

  constructor(private authService: AuthService, private router: Router) {
  }

  ngOnInit() {
    this.authService.userStored.subscribe(data => {
      // this.currentUser = data;
      // console.log(this.currentUser);
    });
    this.myLoginForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      isRememberMe: new FormControl(true)
    });
  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit() {
    console.log(this.myLoginForm);
    if (this.myLoginForm.invalid) {
      return;
    }
    this.isLoading = true;
    const data: User = {email: this.myLoginForm.value.email, password: this.myLoginForm.value.password, returnSecureToken: true};
    let authObservable: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObservable = this.authService.login(data);
    } else {
      authObservable = this.authService.signUp(data);
    }
    authObservable.subscribe(res => {
      // console.log(res);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
    }, error1 => {
      console.log(error1);
      alert(error1);
      this.isLoading = false;
    });
  }
}
