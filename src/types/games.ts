import { IReq, IWebSocket, TSendMessage } from './sockets'
import { IUser } from './users'

export interface IGame {
  idGame: number
  idPlayer: number
  idSecondPlayer: number
  firstPlayerCoordinates: any[] | []
  secondPlayerCoordinates: any[] | []
}

export interface IGamesController {
  createGame: (game: IGame, sendMessage: TSendMessage<IGame>) => IGamesResponse
  startGame: (
    data: IReq['data'],
    userId: IUser['index'],
    sendMessage: TSendMessage<IGameDataRes>
  ) => IGamesResponse | null
  getAttack: (data: IAttackRequest, userId: IUser['index']) => IGamesResponse | null
}

export interface IGamesService {
  addGame: (game: IGame) => IGame
  startGame: (data: IReq['data'], userId: IUser['index']) => IGameDataRes | null
  getAttack: (data: IAttackRequest, userId: IUser['index']) => IAttackResponse | null
}

export interface IGameDataReq {
  gameId: number
  ships: Record<string, unknown>[]
  indexPlayer: number
}

export interface IGameDataRes extends IGameDataReq {
  currentPlayerIndex: number
}

export interface IAttackRequest {
  x: number
  y: number
  indexPlayer: number
  gameId: number
}

type TAttackStatus = 'miss' | 'shot' | 'killed'

export interface IAttackResponse {
  currentPlayer: number
  position: {
    x: number
    y: number
  }
  status: TAttackStatus
}

export interface IGamesResponse {
  json?: string
  sendMessage?: () => void
}
