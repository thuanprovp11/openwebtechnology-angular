export class UserModel {
  constructor(public email: string, public id: string, private token: string, private tokenExpirationDate: Date) {
  }

  get tokenUser() {
    if (!this.token || new Date() >= this.tokenExpirationDate) {
      return null;
    } else {
      return this.token;
    }
  }
}
