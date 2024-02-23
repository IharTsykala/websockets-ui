import { INullRoom, IRoom, IRooms, IUser } from '../../types'

export class RoomsService implements IRooms {
  private static id: number

  constructor() {
    RoomsService.id = 1
  }

  // createRoom(userId: number): any {
  //   const id: number = RoomsService.id++
  //
  //   return { data: [], id }
  // }

  uploadRoom(userId: number): any {
    const id: number = RoomsService.id++

    return { id, usersId: [userId], type: 'upload_room' }
  }
}
