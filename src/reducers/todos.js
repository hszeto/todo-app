import { SET_TODOS } from '../shared/constants';

const INITIAL_STATE = [];

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_TODOS:
      // return [ ...state, ...action.payload ];
      return action.payload;
    default:
      return state;
  }
};
