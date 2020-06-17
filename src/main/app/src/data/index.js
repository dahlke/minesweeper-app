/* @flow */
import { combineReducers } from 'redux';
import type { Dispatch } from 'redux';

import comments from './modules/comments';
import auth from './modules/auth';
import game from './modules/game';

export default combineReducers({
  auth,
  comments,
  game
});

export type Thunk<A> = (dispatch: Dispatch<A>, getState: () => Object) => any;
