import { UserPayload } from '../user/types';

export interface AuthSession {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  user: UserPayload;
}
