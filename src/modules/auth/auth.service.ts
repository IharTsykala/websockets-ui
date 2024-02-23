import { IAuthService, IDataBase, IReq, IUser, IUsers } from '../../types'

export class AuthService implements IAuthService {
  constructor(private readonly dataBase: IDataBase, private readonly usersService: IUsers) {}

  private signUp(data: IReq['data']): IUser {
    const user: IUser = this.usersService.createUser(data as Omit<IUser, 'id'>)

    return this.dataBase.addUser(user)
  }

  signIn(data: IReq['data']): IUser {
    const user: IUser | undefined = this.dataBase.getUser(data)

    if (user) {
      return user
    }

    return this.signUp(data)
  }
}
