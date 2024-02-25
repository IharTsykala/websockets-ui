import {
  IDataBase,
  IGame,
  IGamesController,
  IGamesService,
  IReq,
  IUser,
  IWebSocket,
  TSendClient,
  TSendMessage,
} from '../../types'
import { GamesService } from './games.service'
import { COMMANDS, COMMON_ID } from '../../constants'
import { IGameDataRes, IGamesResponse } from '../../types/games'

export class GamesController implements IGamesController {
  gamesService: IGamesService

  constructor(private readonly dataBase: IDataBase) {
    this.gamesService = new GamesService(dataBase)
  }

  private sendClient<T>(client: IWebSocket, data: T): void {
    const responseData = { ...data, idPlayer: client.id }

    client.send(json)
  }

  createGame(game: IGame, sendMessage: TSendMessage<IGame>): IGamesResponse {
    this.dataBase.addGame(game)

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.CREATE_GAME,
      data: JSON.stringify(game),
    })

    const sendMessageDecorator = (game: IGame, sendClient: TSendClient<IGame>) => () => sendMessage(game, sendClient)

    return { json, sendMessage: sendMessageDecorator(game, this.sendClient as TSendClient<IGame>) }
  }

  startGame(data: IReq['data'], userId: IUser['index']): IGamesResponse {
    const response: IGameDataRes = this.gamesService.startGame(data, userId)

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.START_GAME,
      data: JSON.stringify(response),
    })

    return { json }
  }
}
