// @flow

import axios from 'axios';
import type { Thunk } from '../';

export type GameBoard = {
  name: string,
  status: string,
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
    status: string,
    rows: int,
    cols: int,
    mines: int,
    /*
    grid: {
        [
          mine: bool,
          clicked: bool,
          value: int
        ]
    }
    */
  }
};


type State = {
  status: 'started' | 'over',
  gameBoard: GameBoard,
  gameBoardLatestData: {}
}

type GameBoardCreatedAction = {
  type: 'GAME_BOARD_CREATED', payload: GameBoard
};

type GameCellClickedAction = {
  type: 'GAME_CELL_CLICKED', payload: GameCellClickResp
};

type Action = GameBoardCreatedAction | GameCellClickedAction;

const defaultState : State = {
  status: 'pending',
  data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
  switch (action.type) {
    case 'GAME_BOARD_CREATED':
      return {
        status: 'started',
        gameBoard: action.payload
      };

    case 'GAME_CELL_CLICKED':
      return {
        status: state.status,
        gameBoard: state.gameBoard,
        gameBoardLatestData: action.payload
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

export function createGameBoard(inputName, inputRows, inputCols, inputMines) : Thunk<GameBoardCreatedAction> {
  const params = { 
    name: inputName, 
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
export function gameCellClicked(gameCellClickResp : GameCellClickResp) : GameCellClickedAction {
  return {
    type: 'GAME_CELL_CLICKED',
    payload: gameCellClickResp
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
        (success: { data: GameCellClickResp }) => dispatch(gameCellClicked(success.data)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}