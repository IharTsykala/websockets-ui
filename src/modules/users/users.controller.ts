import { IDataBase, IReq, IUser, IUsersController, IUsersService } from '../../types'

import { UsersService } from './users.service'

export class UsersController implements IUsersController {
  usersService: IUsersService

  constructor(private readonly dataBase: IDataBase) {
    this.usersService = new UsersService(this.dataBase)
  }

  createUser(user: Omit<IUser, 'index'>): IUser {
    return this.usersService.createUser(user)
  }

  getUser(user: Omit<IUser, 'password'>): IUser | undefined {
    return this.usersService.getUser(user)
  }
}
