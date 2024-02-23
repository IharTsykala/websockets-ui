import {
  ICommands,
  IDataBase,
  IMainController,
  INullRoom,
  IReq,
  IRes,
  IRoom,
  IRooms,
  IUser,
  IUsers,
  TAuthController,
} from '../../types'
import { AuthController } from '../auth/auth.controller'
import { MAP_TYPE_ACTION } from '../../constants'

export class MainController implements IMainController {
  authController: TAuthController

  constructor(
    private readonly dataBase: IDataBase,
    private readonly usersService: IUsers,
    private readonly roomsService: IRooms
  ) {
    this.authController = new AuthController(this.dataBase, this.usersService)
  }

  run(type: keyof ICommands, data: IReq['data'], userId: IUser['id']): IRes {
    const actionKey = MAP_TYPE_ACTION[type]

    let response = {}

    if (actionKey) {
      response = this[actionKey](data, type)
    }

    return { ...response } as IRes
  }

  private auth(data: IReq['data'], type: keyof ICommands): Omit<IRes, 'type'> {
    const user: IUser = this.authController.signIn(data)

    const jsonUser: string = JSON.stringify(user)

    return [{ data: jsonUser, id: 0, wsId: true, type }, {}] as unknown as Omit<IRes, 'type'>
  }

  private createRoom(): Omit<IRes, 'type'> {
    // const user = this.usersService.getUser(userId)

    const room = this.roomsService.uploadRoom(1)

    // const data = {
    //   roomId: 1,
    //   roomUsers: [
    //     {
    //       name: 'string',
    //       index: 11111,
    //     },
    //   ],
    // }

    const jsonRoom: string = JSON.stringify(data)

    return { data: jsonRoom, id: 0, type: 'update_room' } as unknown as Omit<IRes, 'type'>
  }
}
