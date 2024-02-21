import WebSocket, { WebSocketServer } from 'ws'
import { IMainController, IWebSocket } from '../types'
import { MainController } from '../main/main.controller'

export class WsServer {
  webSocket: WebSocketServer
  mainController: IMainController

  constructor(port: number) {
    this.webSocket = new WebSocketServer({ port })
    this.mainController = new MainController()
  }

  private parseData(jsonData: string) {
    const { type, data, id } = JSON.parse(jsonData)
    const parsedData = JSON.parse(data ?? '')

    const resData = this.mainController.run(type, data, id)

    return { type, parsedData, id }
  }

  run() {
    this.webSocket.on('listening', () => {
      console.log(`ws is listening on the ${this.webSocket.options.port} port!`)
    })

    this.webSocket.on('connection', (ws: IWebSocket) => {
      console.log(`${'WS_CONNECT'} ${this.webSocket.options.port}!`)
      const wsId: number = Math.floor(Math.random() * (1 - 100 + 1)) + 100
      ws.id = wsId
      console.log(`${'CLIENT_CONNECT'} ${wsId}!`)

      ws.on('message', (data: string): void => {
        const { type, parsedData, id } = this.parseData(data.toString())

        this.sendMessage(parsedData)
      })

      ws.on('close', () => {
        console.log(`${'CLIENT_EXIT'} ${wsId}!`)
        const data = this.parseData('')
        console.log('data', data)
        this.sendMessage('close')
      })

      ws.on('error', (err) => console.log('err:', err))
    })

    process.on('SIGINT', () => {
      this.webSocket.close(() => console.log('WS_EXIT'))
      process.exit()
    })
  }

  private sendMessage(data: string): void {
    this.webSocket.clients.forEach((client: WebSocket): void => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }
}
