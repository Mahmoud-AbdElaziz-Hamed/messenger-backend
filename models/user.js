export class User {
  constructor(id, username, email, password) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
  }

  get id() {
    return this._id;
  }

  set id(id) {
    this._id = id;
  }

  get username() {
    return this._username;
  }

  set username(username) {
    this._username = username;
  }

  get email() {
    return this._email;
  }

  set email(email) {
    this._email = email;
  }

  get password() {
    return this._password;
  }

  set password(password) {
    this._password = password;
  }
}
