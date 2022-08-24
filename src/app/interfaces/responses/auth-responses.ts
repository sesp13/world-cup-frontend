import { IUser } from '../user.interface';

export interface LoginResponse {
  msg?: string;
  user?: IUser;
  token?: string;
}
