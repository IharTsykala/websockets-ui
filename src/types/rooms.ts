import { IUser } from './users'

export interface INullRoom {
  data: null
}

export interface IRoom {
  id: number
  usersId: IUser['id'][]
}

export interface IRooms {
  // createRoom: () => INullRoom
  uploadRoom: (userId: number) => IRoom
}
