export class User {
  constructor(id, username, email, password) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
  }

  getId() {
    return this.id;
  }

  setId(newId) {
    this.id = newId;
  }

  getusername() {
    return this.username;
  }

  setusername(newUsername) {
    this.username = newUsername;
  }

  getemail() {
    return this.email;
  }

  setemail(newEmail) {
    this.email = newEmail;
  }

  getpassword() {
    return this.password;
  }

  setpassword(newPassword) {
    this.password = newPassword;
  }
}
