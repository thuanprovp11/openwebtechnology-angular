import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  constructor(private http: HttpClient) {
  }

  onGetUserLoginInfoById(id) {
    return this.http.get('https://books-234.herokuapp.com/api/users/' + id);
  }

  onUpdateUserProfileApi(id,data) {
    return this.http.put('https://books-234.herokuapp.com/api/users/' + id, data);
  }

}
