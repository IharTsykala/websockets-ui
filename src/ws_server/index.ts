import WebSocket, { WebSocketServer } from 'ws'
import { ICommands, IDataBase, IMainController, IReq, IRes, IWebSocket } from '../types'
import { MainController } from '../modules/main/main.controller'
import { IWsServer } from '../types/sockets'
import { COMMANDS } from '../constants'

export class WsServer implements IWsServer {
  webSocket: WebSocketServer
  mainController: IMainController

  constructor(private readonly dataBase: IDataBase, port: number) {
    this.webSocket = new WebSocketServer({ port })
    this.mainController = new MainController(this.dataBase)
  }

  private parseData(jsonData: string): IReq {
    const { type, data, id } = JSON.parse(jsonData ?? '')
    if (!data) {
      return { type, data, id }
    }

    const parsedData = JSON.parse(data)
    return { type, data: parsedData, id }
  }

  private sendMessage(jsonResponseData: string): void {
    // console.log('data', jsonResponseData)
    this.webSocket.clients.forEach((client: WebSocket): void => {
      if (client.readyState === WebSocket.OPEN && (client as IWebSocket).id) {
        client.send(jsonResponseData)
      }
    })
  }

  run(): void {
    this.webSocket.on('listening', () => {
      console.log(`ws is listening on the ${this.webSocket.options.port} port!`)
    })

    this.webSocket.on('connection', (ws: IWebSocket) => {
      console.log(`connection ${this.webSocket.options.port}!`)

      ws.on('message', (dataReg: string): void => {
        const { type, data } = this.parseData(dataReg.toString())

        const response: IRes = this.mainController.run(type as keyof ICommands, data, ws.id)

        if (type === COMMANDS.REG_USER) {
          ws.id = response.userIndex!
        }

        // console.log('response', response)

        for (const key of response.data ?? []) {
          this.sendMessage(key)
        }
      })

      ws.on('close', () => {
        this.sendMessage('close')
      })

      ws.on('error', (err) => console.log('err:', err))
    })

    process.on('SIGINT', () => {
      this.webSocket.close(() => console.log('WS_EXIT'))
      process.exit()
    })
  }
}
