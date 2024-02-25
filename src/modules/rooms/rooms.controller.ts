import { IDataBase, IRoom, IRoomsResponse, IRoomsService, IUser, IUsersController } from '../../types'
import { RoomsService } from './rooms.service'
import { IInitialRoomsResponse, IRoomsController } from '../../types'
import { COMMANDS, COMMON_ID } from '../../constants'

export class RoomsController implements IRoomsController {
  roomsService: IRoomsService

  constructor(private readonly dataBase: IDataBase, private readonly usersController: IUsersController) {
    this.roomsService = new RoomsService(dataBase)
  }

  getInitialRoom(): IInitialRoomsResponse {
    const initialRooms = this.roomsService.getInitialRoom()
    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.UPDATE_ROOM,
      data: JSON.stringify(initialRooms),
    })

    return { json }
  }

  getRooms(): IRoom[] {
    return this.roomsService.getRooms()
  }

  createRoom(userIndex: IUser['index']): IRoomsResponse {
    const user: IUser | object = this.usersController.getUser({ index: userIndex } as Omit<IUser, 'password'>) ?? {}

    const room: IRoom = this.roomsService.addRoom(user)

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.UPDATE_ROOM,
      data: JSON.stringify([{ ...room, roomId: room.id, roomUsers: [user] }]),
    })

    return { json }
  }
}
