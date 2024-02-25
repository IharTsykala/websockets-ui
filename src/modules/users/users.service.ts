import { IDataBase, IReq, IUser, IUsersService } from '../../types'

export class UsersService implements IUsersService {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    UsersService.id = 1
  }

  createUser(user: Omit<IUser, 'index'>): IUser {
    const index: number = UsersService.id++

    const createdUser: IUser = this.dataBase.addUser({ ...user, index })

    return createdUser
  }

  getUser(user: Omit<IUser, 'password'>): IUser | undefined {
    return this.dataBase.getUser(user)
  }
}
