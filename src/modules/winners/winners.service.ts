import { IDataBase, IWinner, IWinnersService } from '../../types'

export class WinnersService implements IWinnersService {
  private static id: number
  private static readonly wins: number = 0

  constructor(private readonly dataBase: IDataBase) {
    WinnersService.id = 1
  }

  getWinners(): IWinner[] {
    return this.dataBase.getWinners()
  }

  createWinner(userIndex: IWinner['userIndex'], name: IWinner['name']): IWinner {
    const id: number = WinnersService.id++
    const wins: number = WinnersService.wins

    const winner: IWinner = this.dataBase.addWinner({ id, userIndex, name, wins })

    return winner
  }
}
