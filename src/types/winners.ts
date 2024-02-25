import { IUser } from './users'

export interface IWinner {
  id: number
  userIndex: IUser['index']
  name: IUser['name']
  wins: number
}

export interface IWinnersResponse {
  json: string
}

export interface IWinnersController {
  getWinners: () => IWinner[]
  createWinner: (userIndex: IUser['index'], userName: IUser['name']) => IWinnersResponse
}

export interface IWinnersService {
  getWinners: () => IWinner[]
  createWinner: (userId: IWinner['userIndex'], userName: IWinner['name']) => IWinner
}
