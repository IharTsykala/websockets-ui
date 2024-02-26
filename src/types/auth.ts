import { IReq } from './sockets'
import { IUser } from './users'

export interface IAuthService {
  signIn: (data: IReq['data']) => IUser
}

export interface IAuthResponse {
  json: string
  userIndex: number
  userName: string
}

export interface IAuthController {
  signIn: (data: IReq['data']) => IAuthResponse
}
