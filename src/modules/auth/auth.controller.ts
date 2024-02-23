import { IAuthService, IDataBase, IReq, IUser, IUsers, TAuthController } from '../../types'

import { AuthService } from './auth.service'

export class AuthController implements TAuthController {
  authService: IAuthService

  constructor(private readonly dataBase: IDataBase, private readonly usersService: IUsers) {
    this.authService = new AuthService(this.dataBase, this.usersService)
  }

  signIn(data: IReq['data']): IUser {
    return this.authService.signIn(data)
  }
}
