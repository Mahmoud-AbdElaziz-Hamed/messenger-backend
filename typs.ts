export type TokenData = {
  id: number;
  username: string;
};

export type AuthResponse = {
  token: string;
  userId: number;
};
export type UserData = {
  id?: number;
  username?: string;
  email?: string;
  password?: string;
  isOnline?: boolean;
};
export type MessageData = {
  id?: number;
  body?: string;
  senderId?: number;
  receiverId?: number;
  timestamp?: number;
};
