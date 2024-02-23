import { IDataBase, IRoom, IUser, IWinner } from '../types'
import { REDUNDANT_PROPS } from '../constants'

export class DataBase implements IDataBase {
  private readonly users: IUser[]
  private readonly rooms: IRoom[]
  private readonly winners: IWinner[]

  constructor() {
    this.users = []
    this.rooms = []
    this.winners = []
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
    const index: number = this.users.findIndex((oldUser): boolean => oldUser.id === user.id)

    if (index !== -1) {
      this.users[index] = { ...this.users[index], ...user }
      return true
    }

    return false
  }

  addRoom(room: IRoom): IRoom {
    this.rooms.push(room)

    return room
  }

  updateRoom(roomId: IRoom['id'], userId: IUser['id']): IRoom | undefined {
    const room: IRoom | undefined = this.rooms.find(({ id }): boolean => id === roomId)

    if (room && room.usersId.length < 2) {
      room.usersId.push(userId)

      return room
    }
  }

  addWinner(winner: IWinner): IWinner {
    this.winners.push(winner)

    return winner
  }

  updateWinner(userId: IUser['id']): IWinner | undefined {
    const winner: IWinner | undefined = this.winners.find((winner): boolean => winner.userId === userId)

    if (winner) {
      winner.wins++

      return winner
    }
  }
}
