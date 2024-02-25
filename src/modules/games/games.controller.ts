import { IDataBase, IGame, IGamesController, IGamesService } from '../../types'
import { GamesService } from './games.service'
import { COMMANDS, COMMON_ID } from '../../constants'
import { IGamesResponse } from '../../types/games'

export class GamesController implements IGamesController {
  gamesService: IGamesService

  constructor(private readonly dataBase: IDataBase) {
    this.gamesService = new GamesService(dataBase)
  }

  createGame(game: IGame): IGamesResponse {
    this.dataBase.addGame(game)

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.CREATE_GAME,
      data: JSON.stringify(game),
    })

    return { json }
  }
}
