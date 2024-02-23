import WebSocket from 'ws'

export interface IWebSocket extends WebSocket {
  id: number
}

export interface IReq {
  type: string
  data: Record<string, string | number>
  id: number
}

export interface IRes extends IReq {
  wsId?: boolean
  indexRoom?: number
}

type IParseData = (jsonData: string) => IReq | IRes

type ISendMessage = (data: string) => void

type IRun = () => void

export interface IWsServer {
  run: IRun
}
