import WebSocket, { WebSocketServer } from 'ws'
import { ICommands, IDataBase, IMainController, IReq, IRes, IRooms, IUsers, IWebSocket } from '../types'
import { MainController } from '../modules/main/main.controller'
import { IWsServer } from '../types/sockets'

export class WsServer implements IWsServer {
  webSocket: WebSocketServer
  mainController: IMainController

  constructor(
    private readonly dataBase: IDataBase,
    private readonly users: IUsers,
    private readonly rooms: IRooms,
    port: number
  ) {
    this.webSocket = new WebSocketServer({ port })
    this.mainController = new MainController(this.dataBase, this.users, this.rooms)
  }

  private parseData(jsonData: string): IReq | IRes {
    const { type, data, id } = JSON.parse(jsonData ?? '')
    if (!data) {
      return { type, data, id }
    }

    const parsedData = JSON.parse(data)
    return { type, data: parsedData, id }
  }

  private sendMessage(jsonResponseData: string): void {
    console.log('data', jsonResponseData)
    this.webSocket.clients.forEach((client: WebSocket): void => {
      if (client.readyState === WebSocket.OPEN) {
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

        const responseData: IRes = this.mainController.run(type as keyof ICommands, data, ws.id)

        if (responseData.wsId) {
          ws.id = responseData.id
        }

        const jsonResponseData: string = JSON.stringify(responseData)

        this.sendMessage(jsonResponseData)
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
