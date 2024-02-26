import { ICommands } from '../types'

export const COMMANDS = {
  REG_USER: 'reg',
  CREATE_GAME: 'create_game',
  START_GAME: 'start_game',
  CREATE_ROOM: 'create_room',
  ADD_SHIPS: 'add_ships',
  UPDATE_ROOM: 'update_room',
  UPDATE_WINNERS: 'update_winners',
  ADD_USER_TO_ROOM: 'add_user_to_room',
  ATTACK: 'attack',
  RANDOM_ATTACK: 'randomAttack',
  TURN: 'turn',
  FINISH: 'finish',
  DISCONNECT: 'disconnect',
  SINGLE_PLAY: 'single_play',
}

export const MAP_TYPE_ACTION: ICommands = {
  reg: 'auth',
  create_room: 'createRoom',
  add_user_to_room: 'createGame',
  add_ships: 'startGame',
  attack: 'getAttack',
}

export const COMMON_ID = 0
