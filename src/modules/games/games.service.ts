import { IDataBase, IGame, IReq, IUser } from '../../types'
import { IGamesService } from '../../types'
import { IGameDataRes } from '../../types/games'

export class GamesService implements IGamesService {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    GamesService.id = 1
  }

  addGame(game: IGame): IGame {
    return this.dataBase.addGame(game)
  }

  startGame(data: IReq['data'], userId: IUser['index']): IGameDataRes {
    console.log('userId', userId)
    data.currentPlayerIndex = userId

    return data as unknown as IGameDataRes
  }
}
