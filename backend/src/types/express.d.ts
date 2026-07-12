import { UserPayload } from '../modules/user/types';

declare global {
  namespace Express {
    export interface Request {
      user?: UserPayload;
    }
  }
}
