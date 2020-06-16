// @flow

import axios from 'axios';
import type { Thunk } from '../';

export type GameCellClick = {
    x: int,
    y: int
};

export type GameCell = {
  mine: bool,
  clicked: bool,
  value: string
};

export type GameRow = {
  cells: GameCell[]
};

export type GameBoard = {
  rows: GameRow[]
};

type State = {
  status: 'new' | 'started',
  gameBoard: GameBoard
}

type ClickCellAction = {
  type: 'CLICK_CELL',
  payload: GameCellClick
};

type GameBoardRefreshedAction = {
  type: 'GAME_BOARD_REFRESHED', payload: Comment[]
};

type Action = ClickCellAction | GameBoardRefreshedAction;

const defaultState : State = {
  status: 'pending',
  data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
  switch (action.type) {
    case 'GAME_BOARD_REFRESHED':
      return {
        status: 'loaded',
        data: action.payload
      };

    default:
      return state;
  }
}

export function cellClicked(gameBoard : GameBoard) : ClickCellAction {
  return {
    type: 'CELL_CLICKED',
    payload: cellClick
  };
}

export function clickCell(author : string, content : string) : Thunk<ClickCellAction> {
  return dispatch => {
    axios.post('/api/click-cell', { author, content })
      .then(
        (success: { data: GameBoard }) => dispatch(cellClicked(success.data)),
        // TODO: something more helpful with this failure
        failure => console.error(failure)
      );
  };
}

export function gameBoardRefreshed(comments : Comment[]) : GameBoardRefreshedAction {
  return {
    type: 'GAME_BOARD_REFRESHED',
    payload: comments
  };
}

export function refreshGameBoard() : Thunk<GameBoardRefreshedAction> {
  return dispatch => {
    axios.get('/api/game-board')
      .then(
        (success: { data: GameBoard }) => dispatch(commentsRefreshed(success.data)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}
