import { IReq } from './sockets'
import { IUser } from './users'

export interface IAuthService {
  signIn: (data: IReq['data']) => IUser;
}

export type TAuthController = IAuthService
