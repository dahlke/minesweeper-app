// @flow

import axios from 'axios';
import type { Thunk } from '../';

export type GameBoard = {
  name: string,
  rows: int,
  cols: int,
  mines: int
};

export type GameCellClickResp = {
  cell: {
    mine: bool,
    clicked: bool,
    value: int
  },
  game: {
    name: string,
    rows: int,
    cols: int,
    mines: int,
  },
  click: {
    row: int,
    col: int
  }
};


type State = {
  gameBoard: GameBoard,
  gameBoardLatestData: {},
  lastClicked: {}
}

type GameBoardCreatedAction = {
  type: 'GAME_BOARD_CREATED', payload: GameBoard
};

type GameCellClickedAction = {
  type: 'GAME_CELL_CLICKED', payload: GameCellClickResp
};

type Action = GameBoardCreatedAction | GameCellClickedAction;

const defaultState : State = {
  data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
  switch (action.type) {
    case 'GAME_BOARD_CREATED':
      return {
        gameBoard: action.payload
      };

    case 'GAME_CELL_CLICKED':
      return {
        status: 'playing',
        gameBoard: state.gameBoard,
        gameBoardLatestData: action.payload,
        lastClicked: {
          row: action.row,
          col: action.col
        }
      };
    default:
      return state;
  }
}

// Game Board Creation Functions
export function gameBoardCreated(gameBoard : GameBoard) : GameBoardCreatedAction {
  return {
    type: 'GAME_BOARD_CREATED',
    payload: gameBoard
  };
}

export function createGameBoard(inputRows, inputCols, inputMines) : Thunk<GameBoardCreatedAction> {
  const timestampName = new Date().getTime();

  const params = { 
    name: timestampName, 
    rows: inputRows, 
    cols: inputCols, 
    mines: inputMines 
  }

  return dispatch => {
      axios.post('/api/game', params)
      .then(
        (success: { data: GameBoard }) => dispatch(gameBoardCreated(success.data)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}

// Game Cell Click Functions
export function gameCellClicked(gameCellClickResp: GameCellClickResp, row: int, col: int) : GameCellClickedAction {
  return {
    type: 'GAME_CELL_CLICKED',
    payload: gameCellClickResp,
    row: row,
    col: col
  };
}

export function clickGameCell(gameName, row, col) : Thunk<GameCellClickedAction> {
  const params = { 
    name: gameName, 
    row: row, 
    col: col
  }

  return dispatch => {
      axios.post('/api/click', params)
      .then(
        (success: { data: GameCellClickResp }) => dispatch(gameCellClicked(success.data, row, col)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}