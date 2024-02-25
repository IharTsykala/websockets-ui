import { IDataBase, IGame } from '../../types'
import { IGamesService } from '../../types'

export class GamesService implements IGamesService {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    GamesService.id = 1
  }

  addGame(game: IGame): IGame {
    return this.dataBase.addGame(game)
  }
}
