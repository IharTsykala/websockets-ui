import { IDataBase, IRoom, IRoomsService, IUser, IWinner } from '../../types'

export class RoomsService implements IRoomsService {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    RoomsService.id = 1
  }

  getInitialRoom(): [] {
    return []
  }

  getRooms(): IRoom[] {
    return this.dataBase.getRooms()
  }

  getRoom(roomId: number): IRoom | undefined {
    return this.dataBase.getRoom(roomId)
  }

  addRoom(user: IUser): IRoom {
    const roomId: number = RoomsService.id++

    return this.dataBase.addRoom({ roomId, roomUsers: [user] })
  }

  removeRoom(roomId: IRoom['roomId']): IRoom[] | [] {
    return this.dataBase.removeRoom(roomId)
  }
}
