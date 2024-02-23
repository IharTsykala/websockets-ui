import { httpServer } from './http_server'
import { WsServer } from './ws_server'
import { DataBase } from './dataBase'
import { IDataBase, IRooms, IUsers } from './types'
import { UsersService } from './modules/users/users.service'
import { RoomsService } from './modules/rooms/rooms.service'

const HTTP_PORT = 8181
const WS_PORT = 3000

console.log(`Start static http server on the ${HTTP_PORT} port!`)
httpServer.listen(HTTP_PORT)

const dataBase: IDataBase = new DataBase()
const users: IUsers = new UsersService(dataBase)
const rooms: IRooms = new RoomsService()

const wsServer: WsServer = new WsServer(dataBase, users, rooms, WS_PORT)
wsServer.run()
