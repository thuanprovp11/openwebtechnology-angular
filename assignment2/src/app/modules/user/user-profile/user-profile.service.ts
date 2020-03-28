import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface UserInfo {
  id: string;
  email: string;
  fullName: string;
  birthday: Date;
  enabled: boolean;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {
  }

  onGetUserLoginInfoById(id) {
    return this.http.get<UserInfo>('https://books-234.herokuapp.com/api/users/' + id);
  }

  onUpdateUserProfileApi(id, data) {
    return this.http.put('https://books-234.herokuapp.com/api/users/' + id, data);
  }

}