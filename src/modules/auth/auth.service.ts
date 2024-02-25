import { IAuthService, IDataBase, IReq, IUser, IUsersController } from '../../types'

export class AuthService implements IAuthService {
  constructor(private readonly dataBase: IDataBase, private readonly usersController: IUsersController) {}

  private signUp(data: IReq['data']): IUser {
    const user: IUser = this.usersController.createUser(data as Omit<IUser, 'index'>)

    return user
  }

  signIn(data: IReq['data']): IUser {
    const password = data.password
    delete data.password
    const user: IUser | undefined = this.usersController.getUser(data as Omit<IUser, 'password'>)

    if (!user) {
      return this.signUp(data)
    }

    if (user.password !== password) {
      return {} as IUser
    }

    return user
  }
}
