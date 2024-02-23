import { IWinner, IWinners } from '../../types'

export class Winners implements IWinners {
  private static id: number
  private static readonly wins: number = 0

  constructor() {
    Winners.id = 1
  }

  createWinner(user: Pick<IWinner, 'userId'>): IWinner {
    const id: number = Winners.id++
    const wins: number = Winners.wins

    return { ...user, id, wins }
  }
}
