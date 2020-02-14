import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService, LoginData } from './auth.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  isLoading = false;
  loginForm: FormGroup;

  constructor(private authService: AuthService, private dialogRef: MatDialogRef<AuthComponent>) {
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }

  onSubmit() {
    this.isLoading = true;
    const data: LoginData = {email: this.loginForm.value.email, password: this.loginForm.value.password};
    this.authService.login(data).subscribe(result => {
      this.isLoading = false;
      this.dialogRef.close();
    }, error => {
      this.isLoading = false;
      alert(error);
    });
  }
}
