export interface IGame {
  idGame: number
  idPlayer: number
}

export interface IGamesController {
  createGame: (game: IGame) => any
}

export interface IGamesService {
  addGame: (game: IGame) => IGame
}

export interface IGamesResponse {
  json: string
}
