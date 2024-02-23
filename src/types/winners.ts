import { IUser } from './users'

export interface IWinner {
  id: number
  userId: IUser['id']
  wins: number
}

export interface IWinners {
  createWinner: (room: Pick<IWinner, 'userId'>) => IWinner
}
