import WebSocket, { WebSocketServer } from 'ws'

export class WsServer {
  webSocket: WebSocketServer

  constructor(port: number) {
    this.webSocket = new WebSocketServer({ port })
  }

  run() {
    this.webSocket.on('connection', (ws: WebSocket & { id: number }) => {
      console.log(`${'WS_CONNECT'} ${this.webSocket.options.port}!`)
      const wsId = Math.floor(Math.random() * (1 - 100 + 1)) + 100
      ws.id = wsId
      console.log(`${'CLIENT_CONNECT'} ${wsId}!`)

      ws.on('message', (data: string) => {
        const convertData = 'messager'
        console.log('data', data.toString())
        this.sendMessage(data.toString())
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
    this.webSocket.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(data)
      }
    })
  }

  private parseData(rawData: string) {
    // const { type, data, id } = JSON.parse(rawData)
    // const convertData = data.length ? JSON.parse(data) : data
    //
    // return { type, data: convertData, id }
    return ''
  }
}
