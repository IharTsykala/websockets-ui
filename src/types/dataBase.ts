import { IUser } from './users'
import { IRoom } from './rooms'
import { IWinner } from './winners'

export interface IDataBase {
  getUsers(): IUser[]
  getUser(userProps: Partial<IUser>): IUser | undefined
  addUser(user: IUser): IUser
  updateUser(user: IUser): boolean
  addRoom(room: IRoom): IRoom
  updateRoom(roomId: IRoom['id'], userId: IUser['id']): IRoom | undefined
  addWinner(winner: IWinner): IWinner
  updateWinner(userId: IUser['id']): IWinner | undefined
}
