import WebSocket, { WebSocketServer } from 'ws'
import { ICommands, IDataBase, IMainController, IReq, IRes, IWebSocket, TSendClient } from '../types'
import { MainController } from '../modules/main/main.controller'
import { IWsServer } from '../types/sockets'

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

  private sendClient(client: WebSocket, data: string): void {
    client.send(data)
  }

  private sendMessage<T>(responseData: T, sendClient: TSendClient<T>): void {
    this.webSocket.clients.forEach((client: WebSocket): void => {
      if (client.readyState === WebSocket.OPEN) {
        sendClient(client, responseData)
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

        const response: IRes | null = this.mainController.run(
          type as keyof ICommands,
          data,
          ws,
          this.sendMessage.bind(this),
          this.sendClient
        )

        if (!response) {
          return
        }

        for (const key of response.data ?? []) {
          this.sendMessage(key, this.sendClient)
        }
      })

      ws.on('close', () => {
        this.sendMessage('close', this.sendClient)
      })

      ws.on('error', (err) => console.log('err:', err))
    })

    process.on('SIGINT', () => {
      this.webSocket.close(() => console.log('WS_EXIT'))
      process.exit()
    })
  }
}
