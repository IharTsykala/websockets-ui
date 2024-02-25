import { IReq, IRes } from './sockets'
import { ICommands } from './commands'
import { IUser } from './users'

export interface IMainController {
  run: (type: keyof ICommands, data: IReq['data'], userId: IUser['index']) => IRes
}
