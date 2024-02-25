import { IUser } from './users'

export interface IRoom {
  id: number
  users: IUser[]
}

export interface IRoomsResponse {
  json: string
}

// export interface IInitialRoom {
//   type: 'update_room'
//   data: []
//   id: ''
// }

export interface IInitialRoomsResponse {
  json: string
}

export interface IRoomsController {
  getInitialRoom: () => IInitialRoomsResponse
  getRooms: () => IRoom[]
  createRoom: (userIndex: IUser['index']) => IRoomsResponse
  // uploadRoom: (userId: number) => IRoom
}

export interface IRoomsService {
  getInitialRoom: () => []
  getRooms: () => IRoom[]
  addRoom: (user: IUser) => IRoom
  uploadRoom: (userId: number) => IRoom | undefined
}
