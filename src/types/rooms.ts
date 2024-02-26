import { IUser } from './users'

export interface IRoom {
  roomId: number
  roomUsers: IUser[]
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
  getRoom: (roomId: number) => IRoom | undefined
  createRoom: (userIndex: IUser['index']) => IRoomsResponse
  // uploadRoom: (userId: number) => IRoom
  removeRoom: (userId: number) => IRoomsResponse
}

export interface IRoomsService {
  getInitialRoom: () => []
  getRooms: () => IRoom[]
  getRoom: (roomId: number) => IRoom | undefined
  addRoom: (user: IUser) => IRoom
  // uploadRoom: (userId: number) => IRoom | undefined
  removeRoom: (userId: number) => IRoom[] | []
}
