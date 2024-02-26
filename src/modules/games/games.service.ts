import { IAttackResponse, IDataBase, IGame, IReq, IUser } from '../../types'
import { IGamesService } from '../../types'
import { IAttackRequest, IGameDataRes } from '../../types/games'

export class GamesService implements IGamesService {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    GamesService.id = 1
  }

  private getCoordinates(ships: any[]): any[] {
    const coordinates: { x: number; y: number }[] = []

    for (const ship of ships) {
      const startX = ship.position.x
      const startY = ship.position.y

      coordinates.push({ x: startX, y: startY })

      if (ship.direction) {
        for (let i = 0; i < ship.length; i++) {
          coordinates.push({ x: startX, y: startY + i })
        }
      } else {
        for (let i = 0; i < ship.length; i++) {
          coordinates.push({ x: startX + i, y: startY })
        }
      }
    }

    return coordinates
  }

  private removeCoordinate(coordinates: any[], coordinate: { x: number; y: number }): any[] {
    return coordinates.filter((point) => !(point.x === coordinate.x && point.y === coordinate.y))
  }

  addGame(game: IGame): IGame {
    return this.dataBase.addGame(game)
  }

  startGame(data: IReq['data'], userId: IUser['index']): IGameDataRes | null {
    data.currentPlayerIndex = userId

    const game: IGame | undefined = this.dataBase.getGame(data.gameId as number)

    if (!game) {
      return null
    }

    const coordinates = this.getCoordinates(data.ships as any[])

    if (userId === game.idPlayer) {
      game.firstPlayerCoordinates = coordinates
    }

    if (userId === game.idSecondPlayer) {
      game.secondPlayerCoordinates = coordinates
    }

    return data as unknown as IGameDataRes
  }

  getAttack(data: IAttackRequest, userId: IUser['index']): IAttackResponse | null {
    const { x, y, indexPlayer } = data

    const game: IGame | undefined = this.dataBase.getGame(data.gameId as number)

    if (!game) {
      return null
    }

    const isIdPlayer = userId === game.idPlayer

    const coordinates = isIdPlayer ? game.secondPlayerCoordinates : game.firstPlayerCoordinates

    const newCoordinates = this.removeCoordinate(coordinates, { x, y })

    const isShot = newCoordinates.length !== coordinates.length

    const type = isShot ? 'shot' : 'miss'

    if (isIdPlayer && isShot) {
      game.firstPlayerCoordinates = newCoordinates
    }

    if (!isIdPlayer && isShot) {
      game.secondPlayerCoordinates = newCoordinates
    }

    const responseAttack: IAttackResponse = {
      currentPlayer: indexPlayer,
      position: {
        x,
        y,
      },
      status: type,
    }

    return responseAttack
  }
}
