import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UserData {
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
export class UserListService {
  constructor(private http: HttpClient) {
  }

  onGetListUser() {
    return this.http.get<UserData[]>('https://books-234.herokuapp.com/api/users');
  }

  onUpdateStatusUserById(id, data) {
    return this.http.put('https://books-234.herokuapp.com/api/users/' + id, data);
  }

  onDeleteUserById(id) {
    return this.http.delete('https://books-234.herokuapp.com/api/users/' + id);
  }
}
