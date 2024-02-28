export class User {
  private _id: number;
  private _username: string;
  private _email: string;
  private _password?: string;
  private _isOnline: boolean;

  constructor(
    id: number,
    username: string,
    email: string,
    password: string,
    isOnline: boolean
  ) {
    this._id = id;
    this._username = username;
    this._email = email;
    this._password = password;
    this._isOnline = isOnline;
  }

  get id(): number {
    return this._id;
  }

  set id(id: number) {
    this._id = id;
  }

  get username(): string {
    return this._username;
  }

  set username(username: string) {
    this._username = username;
  }

  get email(): string {
    return this._email;
  }

  set email(email: string) {
    this._email = email;
  }

  get password(): string | undefined {
    return this._password;
  }

  set password(password: string) {
    this._password = password;
  }
  get isOnline(): boolean {
    return this._isOnline;
  }

  set isOnline(isOnline: boolean) {
    this._isOnline = isOnline;
  }
}
