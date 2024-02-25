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
  IRoom,
} from '../../types'
import { AuthController } from '../auth/auth.controller'
import { MAP_TYPE_ACTION } from '../../constants'
import { UsersController } from '../users/users.controller'
import { WinnersController } from '../winners/winners.controller'
import { RoomsController } from '../rooms/rooms.controller'
import { IRoomsController } from '../../types'

export class MainController implements IMainController {
  private readonly usersController: IUsersController
  private readonly roomsController: IRoomsController
  private readonly authController: IAuthController
  private readonly winnersController: IWinnersController

  constructor(private readonly dataBase: IDataBase) {
    this.usersController = new UsersController(dataBase)
    this.roomsController = new RoomsController(dataBase, this.usersController)
    this.winnersController = new WinnersController(dataBase)
    this.authController = new AuthController(this.dataBase, this.usersController)
  }

  run(type: keyof ICommands, data: IReq['data'], userId: IUser['index']): IRes {
    const actionKey = MAP_TYPE_ACTION[type]

    let response = {}

    if (actionKey) {
      response = this[actionKey](data, userId)
    }

    return response as IRes
  }

  private auth(data: IReq['data']): IRes {
    const authResponse: IAuthResponse = this.authController.signIn(data)

    const winnersResponse: IWinnersResponse = this.winnersController.createWinner(
      authResponse.userIndex,
      authResponse.userName
    )

    const initialRoomsResponse: IInitialRoomsResponse = this.roomsController.getInitialRoom()

    return {
      data: [authResponse.json, winnersResponse.json, initialRoomsResponse.json],
      userIndex: authResponse.userIndex,
    }
  }

  private createRoom(_: IReq['data'], userId: IUser['index']): IRes {
    this.roomsController.addRoom(userId)

    const rooms: IRoom[] = this.roomsController.createRooms()

    return { data: [roomResponse.json] }
  }
}
