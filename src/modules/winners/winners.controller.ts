import { IDataBase, IUser, IWinner, IWinnersController, IWinnersResponse, IWinnersService } from '../../types'
import { COMMANDS, COMMON_ID } from '../../constants'
import { WinnersService } from './winners.service'

export class WinnersController implements IWinnersController {
  private readonly winnersService: IWinnersService

  constructor(private readonly dataBase: IDataBase) {
    this.winnersService = new WinnersService(this.dataBase)
  }

  getWinners(): IWinner[] {
    return this.winnersService.getWinners()
  }

  createWinner(userIndex: IUser['index'], userName: IUser['name']): IWinnersResponse {
    this.winnersService.createWinner(userIndex, userName)

    const winners: IWinner[] = this.winnersService.getWinners()

    const json: string = JSON.stringify({
      id: COMMON_ID,
      type: COMMANDS.UPDATE_WINNERS,
      data: JSON.stringify(winners),
    })

    return { json }
  }
}
