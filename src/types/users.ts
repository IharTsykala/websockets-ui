import { IReq } from './sockets'

export interface IUser {
  index: number
  name: string
  password: string
}

export interface IUsersController {
  createUser: (user: Omit<IUser, 'index'>) => IUser
  getUser: (user: Omit<IUser, 'password'>) => IUser | undefined
}

export interface IUsersService {
  createUser: (user: Omit<IUser, 'index'>) => IUser
  getUser: (user: Omit<IUser, 'password'>) => IUser | undefined
}
