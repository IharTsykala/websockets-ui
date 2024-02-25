import { IReq, IWebSocket, TSendMessage } from './sockets'
import { IUser } from './users'

export interface IGame {
  idGame: number
  idPlayer: number
}

export interface IGamesController {
  createGame: (game: IGame, sendMessage: TSendMessage<IGame>) => IGamesResponse
  startGame: (data: IReq['data'], userId: IUser['index']) => IGamesResponse
}

export interface IGamesService {
  addGame: (game: IGame) => IGame
  startGame: (data: IReq['data'], userId: IUser['index']) => IGameDataRes
}

export interface IGamesResponse {
  json?: string
  sendMessage?: () => void
}

export interface IGameDataReq {
  gameId: number
  ships: Record<string, unknown>[]
  indexPlayer: number
}

export interface IGameDataRes extends IGameDataReq {
  currentPlayerIndex: number
}
