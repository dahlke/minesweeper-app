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

type State = {
  status: 'started' | 'over',
  gameBoard: GameBoard
}

type GameBoardCreatedAction = {
  type: 'GAME_BOARD_CREATED', payload: GameBoard
};

type Action = GameBoardCreatedAction;

const defaultState : State = {
  status: 'pending',
  data: []
};

export default function reducer(state : State = defaultState, action : Action) : State {
  console.log("reduced", action)
  switch (action.type) {
    case 'GAME_BOARD_CREATED':
      return {
        status: 'started',
        gameBoard: action.payload
      };

    default:
      return state;
  }
}

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
