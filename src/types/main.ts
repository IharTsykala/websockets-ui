import { COMMANDS } from '../constants'

export interface IMainController {
  getAction: (type: keyof typeof COMMANDS) => void
  run: (type: any, data: any, socketId: number) => void
}
