import { IDataBase, IGame, IRoom, IUser, IWinner } from '../types'
import { REDUNDANT_PROPS } from '../constants'

export class DataBase implements IDataBase {
  private readonly users: IUser[]
  private readonly rooms: IRoom[]
  private readonly winners: IWinner[]
  private readonly games: IGame[]

  constructor() {
    this.users = []
    this.rooms = []
    this.winners = []
    this.games = []
  }

  getUsers(): IUser[] {
    return this.users
  }

  getUser(userProps: Partial<IUser>): IUser | undefined {
    return this.users.find((user: IUser): boolean | undefined => {
      for (const key in userProps) {
        if (REDUNDANT_PROPS.includes(key)) {
          continue
        }

        if (user[key as keyof IUser] === userProps[key as keyof IUser]) {
          return true
        }
      }
    })
  }

  addUser(user: IUser): IUser {
    this.users.push(user)
    return user
  }

  updateUser(user: IUser): boolean {
    const index: number = this.users.findIndex((oldUser): boolean => oldUser.index === user.index)

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user }
      return true
    }

    return false
  }

  getRooms(): IRoom[] {
    return this.rooms
  }

  addRoom(room: IRoom): IRoom {
    this.rooms.push(room)

    return room
  }

  removeRoom(roomId: IRoom['roomId']): IRoom[] | [] {
    return this.rooms.filter((room): boolean => room.roomId !== roomId)
  }

  getWinners(): IWinner[] {
    return this.winners
  }

  addWinner(winner: IWinner): IWinner {
    this.winners.push(winner)

    return winner
  }

  updateWinner(userId: IUser['index']): IWinner | undefined {
    const winner: IWinner | undefined = this.winners.find((winner): boolean => winner.userIndex === userId)

    if (winner) {
      winner.wins++

      return winner
    }
  }

  addGame(game: IGame): IGame {
    this.games.push(game)

    return game
  }
}
