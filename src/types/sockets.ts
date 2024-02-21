import WebSocket from 'ws'
export interface IWebSocket extends WebSocket {
  id: number;
}
