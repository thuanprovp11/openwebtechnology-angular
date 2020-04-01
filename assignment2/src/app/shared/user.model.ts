export class UserModel {
  constructor(public role: string, public id: number, private token: string, public expToken: Date) {
  }

  get getTokenUser() {
    if (!this.token || new Date() >= this.expToken) {
      return null;
    }
    return this.token;
  }
}
