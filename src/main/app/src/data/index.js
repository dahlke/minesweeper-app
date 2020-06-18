/* @flow */
import { combineReducers } from 'redux';
import type { Dispatch } from 'redux';

import auth from './modules/auth';
import game from './modules/game';

export default combineReducers({
  auth,
  game
});

export type Thunk<A> = (dispatch: Dispatch<A>, getState: () => Object) => any;
