import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from './user-profile.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser;
  roles: { value: string, viewValue: string }[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'user', viewValue: 'User'},
  ];

  constructor(private authService: AuthService, private userProfileService: UserProfileService) {
  }

  ngOnInit(): void {
    this.currentUser = this.authService.loadedUserLogin();
    this.userProfileService.onGetUserLoginInfoById().subscribe(data => {
      this.currentUser = data;
    });
    // we do init form when data recived later
    this.profileForm = new FormGroup({
      fullName: new FormControl('test', Validators.required),
      birthday: new FormControl(null, Validators.required)
    });
  }


}
