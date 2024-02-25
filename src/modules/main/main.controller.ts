import {
  ICommands,
  IDataBase,
  IMainController,
  IReq,
  IRes,
  IAuthController,
  IAuthResponse,
  IUsersController,
  IWinnersController,
  IWinnersResponse,
  IInitialRoomsResponse,
  IUser,
  IRoomsResponse,
  IGame,
  IGamesController,
  IWebSocket,
  TSendMessage,
} from '../../types'
import { AuthController } from '../auth/auth.controller'
import { MAP_TYPE_ACTION } from '../../constants'
import { UsersController } from '../users/users.controller'
import { WinnersController } from '../winners/winners.controller'
import { RoomsController } from '../rooms/rooms.controller'
import { IRoomsController } from '../../types'
import { GamesController } from '../games/games.controller'
import { IGamesResponse } from '../../types/games'

export class MainController implements IMainController {
  private readonly usersController: IUsersController
  private readonly roomsController: IRoomsController
  private readonly authController: IAuthController
  private readonly winnersController: IWinnersController
  private readonly gamesController: IGamesController

  constructor(private readonly dataBase: IDataBase) {
    this.usersController = new UsersController(dataBase)
    this.roomsController = new RoomsController(dataBase, this.usersController)
    this.winnersController = new WinnersController(dataBase)
    this.authController = new AuthController(this.dataBase, this.usersController)
    this.gamesController = new GamesController(this.dataBase)
  }

  run(type: keyof ICommands, data: IReq['data'], ws: IWebSocket, sentMessage: TSendMessage<unknown>): IRes | null {
    const actionKey = MAP_TYPE_ACTION[type]

    let response = null

    if (actionKey) {
      response = this[actionKey](data, ws, sentMessage)
    }

    return response
  }

  private auth(data: IReq['data'], ws: IWebSocket): null {
    const authResponse: IAuthResponse = this.authController.signIn(data)

    const winnersResponse: IWinnersResponse = this.winnersController.createWinner(
      authResponse.userIndex,
      authResponse.userName
    )

    const initialRoomsResponse: IInitialRoomsResponse = this.roomsController.getInitialRoom()

    ws.id = authResponse.userIndex

    const jsons = [authResponse.json, winnersResponse.json, initialRoomsResponse.json]

    for (const key of jsons) {
      ws.send(key)
    }

    return null
  }

  private createRoom(_: IReq['data'], ws: IWebSocket): IRes {
    const roomResponse: IRoomsResponse = this.roomsController.createRoom(ws.id)

    return { data: [roomResponse.json] }
  }

  private createGame(data: IReq['data'], ws: IWebSocket, sendMessage: TSendMessage<unknown>): IRes {
    const roomResponse: IRoomsResponse = this.roomsController.removeRoom(ws.id)

    const gameResponse: IGamesResponse = this.gamesController.createGame(
      {
        idGame: Number(data.indexRoom),
        idPlayer: ws.id,
      },
      sendMessage as TSendMessage<IGame>
    )

    const sendMessageDecorator = gameResponse.sendMessage!

    return { data: [roomResponse.json, gameResponse.json] }
  }

  private startGame(data: IReq['data'], ws: IWebSocket): IRes {
    const gameResponse: IGamesResponse = this.gamesController.startGame(data, ws.id)

    return { data: [gameResponse.json] }
  }
}
