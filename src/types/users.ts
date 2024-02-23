export interface IUser {
  id: number
  login: string
  password: string
}

export interface IUsers {
  createUser: (user: Omit<IUser, 'id'>) => IUser
  getUser: (id: number) => IUser | undefined
}
