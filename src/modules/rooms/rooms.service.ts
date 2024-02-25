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

  addRoom(user: IUser): IRoom {
    const id: number = RoomsService.id++

    return this.dataBase.addRoom({ id, users: [user] })
  }

  uploadRoom(userId: number): IRoom | undefined {
    const id: number = RoomsService.id++

    return this.dataBase.updateRoom({ id, userId })
  }
}
