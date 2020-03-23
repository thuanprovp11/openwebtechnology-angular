import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from './user-profile.service';
import { BookComponent } from '../../book/book.component';
import { UserComponent } from '../user.component';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoaded = false;
  currentUser;
  roles: { value: string, viewValue: string }[] = [
    {value: 'admin', viewValue: 'Admin'},
    {value: 'user', viewValue: 'User'},
  ];

  constructor(private authService: AuthService, private userProfileService: UserProfileService, private userComponent: UserComponent) {
  }

  ngOnInit(): void {
    // load current User from localstorage
    this.currentUser = this.authService.loadedUserLogin();
    this.userProfileService.onGetUserLoginInfoById(this.currentUser.id).subscribe(data => {
      this.currentUser = data;
      console.log(this.currentUser);
      this.initForm();
      this.isLoaded = true;
    });
  }

  private initForm() {
    this.profileForm = new FormGroup({
      fullName: new FormControl(this.currentUser.fullName, Validators.required),
      birthday: new FormControl(new Date(this.currentUser.birthday), [Validators.required])
    });
  }

  onUpdateUserProfile() {
    this.userProfileService.onUpdateUserProfileApi(this.currentUser.id, this.profileForm.value).subscribe(data => {
      this.userComponent.onShowSnackBar({message: 'Profile was updated!!!', isSuccess: true}, 5000);
    });
  }
}
