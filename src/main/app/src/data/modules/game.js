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
  status: 'new' | 'started' | 'over',
  gameBoard: GameBoard
}

type GameBoardCreatedAction = {
  type: 'GAME_BOARD_CREATED', payload: Comment[]
};

type Action = GameBoardCreatedAction;

const defaultState : State = {
  status: 'pending',
  data: []
};

/*
curl -i -X POST '127.0.0.1:8080/api/game' -d name=fub -d rows=10 -d cols=10 -d mines=20
curl -i -X POST '127.0.0.1:8080/api/start' -d name=fub
curl -i -X POST '127.0.0.1:8080/api/click' -d name=fub -d x=1 -d y=1
*/

export default function reducer(state : State = defaultState, action : Action) : State {
  switch (action.type) {
    case 'GAME_BOARD_CREATED':
      return {
        status: 'new',
        gameBoard: action.payload
      };

    default:
      return state;
  }
}

export function gameBoardCreated(gameBoard : GameBoard) : GameBoardCreatedAction {
  console.log("game board created", gameBoard);
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
  console.log("axios create game board", params);

  return dispatch => {
      axios.post('/api/game', params)
      .then(
        (success: { data: GameBoard }) => dispatch(gameBoardCreated(success.data)),
        // TODO: something more helpful with this failure
        failure => console.log(failure)
      );
  };
}
