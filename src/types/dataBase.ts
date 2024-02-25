import { IUser } from './users'
import { IRoom } from './rooms'
import { IWinner } from './winners'
import { IGame } from './games'

export interface IDataBase {
  getUsers(): IUser[]
  getUser(userProps: Partial<IUser>): IUser | undefined
  addUser(user: IUser): IUser
  updateUser(user: IUser): boolean
  getRooms(): IRoom[]
  addRoom(room: IRoom): IRoom
  removeRoom(roomId: IRoom['roomId']): IRoom[] | []
  getWinners(): IWinner[]
  addWinner(winner: IWinner): IWinner
  updateWinner(userId: IUser['index']): IWinner | undefined
  addGame(game: IGame): IGame
}
