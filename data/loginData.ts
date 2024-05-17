import { LoginData } from "../pages/login";
import 'dotenv/config';

export const correctLoginData = (): LoginData => ({
    username: process.env.USERNAME!!,
    password: process.env.PASSWORD!!
  });

  export const incorrectLoginData = (): LoginData => ({
    username: 'wrongUsername',
    password: 'wrongPassword'
  });

  export const correctUsernameWrongPassword = (): LoginData => ({
    username: process.env.USERNAME!!,
    password: 'wrongPassword'
  });

  export const correctPasswordWrongUsername = (): LoginData => ({
    username: 'wrongUsername',
    password: process.env.PASSWORD!!
  });