import { IAuthController, IMainController } from '../types'
import { COMMANDS } from '../constants'
import { AuthController } from '../auth/auth.controller'

export class MainController implements IMainController {
  auth: IAuthController
  constructor() {
    this.auth = new AuthController()
  }

  getAction(type: keyof typeof COMMANDS) {
    return (
      [
        {
          condition: COMMANDS.REG_USER === type,
          action: this.auth.run(),
        },
      ].find(({ condition }) => condition)?.action ?? (() => '')
    )
  }

  run(type: any, data: any, socketId: number) {
    this.getAction(type)()
  }
}
