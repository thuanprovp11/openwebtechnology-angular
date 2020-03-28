import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../core/auth/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserProfileService } from './user-profile.service';
import { UserComponent } from '../user.component';
import { ActivatedRoute, Params } from '@angular/router';
import { CustomValidator } from '../../../shared/customValidator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  profileForm: FormGroup;
  isLoaded = false;
  currentUser;
  idUser: string;
  isEditAnotherUser = false;
  defaultFieldForm = {
    fullName: '',
    birthday: null
  };

  constructor(private authService: AuthService, private userProfileService: UserProfileService,
              private userComponent: UserComponent, private routeActived: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.routeActived.params.subscribe((params: Params) => {
      this.isEditAnotherUser = (!isNaN(Number(params.id)) && +params.id != null);
      this.idUser = params.id;
      // load user from API
      if (this.isEditAnotherUser) {
        this.userProfileService.onGetUserLoginInfoById(this.idUser).subscribe(data => {
          this.defaultFieldForm.fullName = data.fullName;
          this.defaultFieldForm.birthday = data.birthday;
          this.initForm();
          this.isLoaded = true;
        });
      } else {
        // load current User from localstorage and save id
        this.currentUser = this.authService.loadedUserLogin();
        this.idUser = this.currentUser.id;
        this.userProfileService.onGetUserLoginInfoById(this.currentUser.id).subscribe(data => {
          this.defaultFieldForm = data;
          this.initForm();
          this.isLoaded = true;
        });
      }
    });
  }

  private initForm() {
    this.profileForm = new FormGroup({
      fullName: new FormControl(this.defaultFieldForm.fullName, Validators.required),
      birthday: new FormControl(new Date(this.defaultFieldForm.birthday), [Validators.required, CustomValidator.onValidatorDateTime])
    });
  }

  onUpdateUserProfile() {
    this.userProfileService.onUpdateUserProfileApi(this.idUser, this.profileForm.value).subscribe(data => {
      this.userComponent.onShowSnackBar({message: 'Profile was updated!!!', isSuccess: true}, 5000);
    });
  }
}
