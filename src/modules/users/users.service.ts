import { IDataBase, IUser, IUsers } from '../../types'

export class UsersService implements IUsers {
  private static id: number

  constructor(private readonly dataBase: IDataBase) {
    UsersService.id = 1
  }

  createUser(user: Omit<IUser, 'id'>): IUser {
    const id: number = UsersService.id++

    return { ...user, id }
  }

  getUser(id: number): IUser | undefined {
    return this.dataBase.getUser({ id })
  }
}
