import WebSocket from 'ws'
import { ICommands } from './commands'
import { IInitialRoomsResponse } from './rooms'

export interface IWebSocket extends WebSocket {
  id: number
}

export interface IReq {
  type: keyof ICommands
  data: Record<string, unknown>
  id: number
}

export interface IRes {
  data: string[]
  userIndex?: number
}

type IParseData = (jsonData: string) => IReq | IRes

type ISendMessage = (data: string) => void

type IRun = () => void

export interface IWsServer {
  run: IRun
}

export type TSendClient<T> = (client: WebSocket, responseData: T) => void

export type TSendMessage<T> = (responseData: T, sendClient: TSendClient<T>) => void
