import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginData, SignUpData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;
  isLogin = true;

  constructor(private authService: AuthService, private router: Router) {
  }

  onSwitchButton() {
    this.isLogin = !this.isLogin;
    if (this.isLogin === false) {
      this.loginForm.addControl('fullName', new FormControl(null, Validators.required));
      this.loginForm.addControl('birthday', new FormControl(null, Validators.required));
    } else {
      this.loginForm.removeControl('fullName');
      this.loginForm.removeControl('birthday');
    }
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    this.isLoading = true;
    let authObservable: Observable<any>;
    if (this.isLogin) {
      // data for login
      const data: LoginData = {email: this.loginForm.value.email, password: this.loginForm.value.password};
      authObservable = this.authService.login(data);
    } else {
      // data for signup
      const data: SignUpData = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password,
        fullName: this.loginForm.value.fullName,
        birthday: this.loginForm.value.birthday
      };
      authObservable = this.authService.signup(data);
    }

    authObservable.subscribe(result => {
      this.isLoading = false;
      this.router.navigate(['/book/book-list']);
      console.log(result);
    }, error => {
      this.isLoading = false;
    });
  }
}
