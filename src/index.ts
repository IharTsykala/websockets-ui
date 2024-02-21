import { httpServer } from './http_server'
import { WsServer } from './ws_server'

const HTTP_PORT = 8181
const WS_PORT = 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

const wsServer = new WsServer(WS_PORT)
wsServer.run()
