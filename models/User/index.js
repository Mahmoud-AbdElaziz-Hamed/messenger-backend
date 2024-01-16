class User {
  constructor(id, userName, email, password) {
    this.id = id;
    this._userName = userName;
    this._email = email;
    this._password = password;
  }

  get userId() {
    return this.id;
  }

  set userId(newId) {
    this.id = newId;
  }

  get userName() {
    return this._userName;
  }

  set userName(newUserName) {
    this._userName = newUserName;
  }

  get email() {
    return this._email;
  }

  set email(newEmail) {
    this._email = newEmail;
  }

  get password() {
    return this._password;
  }

  set password(newPassword) {
    this.password = newPassword;
  }
}
module.exports = User;
