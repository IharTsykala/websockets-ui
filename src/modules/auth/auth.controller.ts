import { IAuthController, IAuthResponse, IAuthService, IDataBase, IReq, IUser, IUsersController } from '../../types'

import { AuthService } from './auth.service'
import { COMMANDS, COMMON_ID } from '../../constants'

export class AuthController implements IAuthController {
  authService: IAuthService

  constructor(private readonly dataBase: IDataBase, private readonly usersController: IUsersController) {
    this.authService = new AuthService(this.dataBase, this.usersController)
  }

  signIn(data: IReq['data']): IAuthResponse {
    const user: IUser = this.authService.signIn(data)

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.REG_USER,
      data: JSON.stringify({ ...user, userIndex: user.index, userName: user.name }),
    })

    return { json, userIndex: user.index, userName: user.name }
  }
}
