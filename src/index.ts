import { httpServer } from './http_server'
import { WsServer } from './ws_server'
import { DataBase } from './dataBase'
import { IDataBase } from './types'

const HTTP_PORT = 8181
const WS_PORT = 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

const dataBase: IDataBase = new DataBase()

const wsServer: WsServer = new WsServer(dataBase, WS_PORT)
wsServer.run()
