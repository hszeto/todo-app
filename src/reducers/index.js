import { combineReducers } from 'redux';
import { SIGN_OUT }      from '../shared/constants';
// import currentUser       from './currentUser';
// import isAuthenticated   from './auth';
import isLoading         from './loader';


const appReducer = combineReducers({
  // currentUser,
  // isAuthenticated,
  isLoading
});

export default (state, action) => {
  if ( action.type === SIGN_OUT ) {
    state = undefined;
  }

  return appReducer(state, action)
};
