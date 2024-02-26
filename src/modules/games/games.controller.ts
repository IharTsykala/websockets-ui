import {
  IAttackRequest,
  IAttackResponse,
  IDataBase,
  IGame,
  IGamesController,
  IGamesService,
  IReq,
  IRoom,
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

  private sendClientCreateGame<T extends IGame>(client: IWebSocket, data: T): void {
    const responseData = { ...data, idPlayer: client.id }

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.CREATE_GAME,
      data: JSON.stringify(responseData),
    })

    client.send(json)
  }

  private sendClientStartGame<T extends IGameDataRes>(client: IWebSocket, data: T): void {
    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.START_GAME,
      data: JSON.stringify(data),
    })

    if (client.id === data.currentPlayerIndex) {
      client.send(json)
    }
  }

  createGame(game: IGame, sendMessage: TSendMessage<IGame>): IGamesResponse {
    this.dataBase.addGame(game)

    const sendMessageDecorator = (game: IGame, sendClient: TSendClient<IGame>) => () => sendMessage(game, sendClient)

    return { sendMessage: sendMessageDecorator(game, this.sendClientCreateGame as TSendClient<IGame>) }
  }

  startGame(
    data: IReq['data'],
    userId: IUser['index'],
    sendMessage: TSendMessage<IGameDataRes>
  ): IGamesResponse | null {
    const response: IGameDataRes | null = this.gamesService.startGame(data, userId)

    if (!response) {
      return null
    }

    const sendMessageDecorator = (game: IGameDataRes, sendClient: TSendClient<IGameDataRes>) => () =>
      sendMessage(game, sendClient)

    return { sendMessage: sendMessageDecorator(response, this.sendClientStartGame as TSendClient<IGameDataRes>) }
  }

  getAttack(data: IAttackRequest, userId: IUser['index']): IGamesResponse | null {
    const response: IAttackResponse | null = this.gamesService.getAttack(data, userId)

    if (!response) {
      return null
    }

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.ATTACK,
      data: JSON.stringify(response),
    })

    return { json }
  }
}
