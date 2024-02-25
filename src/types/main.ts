import { IReq, IRes, IWebSocket, TSendMessage } from './sockets'
import { ICommands } from './commands'

export interface IMainController {
  run: (type: keyof ICommands, data: IReq['data'], ws: IWebSocket, sendMessage: TSendMessage<unknown>) => IRes | null
}
