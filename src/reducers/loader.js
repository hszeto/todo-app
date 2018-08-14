import { START_LOADING, STOP_LOADING } from '../shared/constants';

export default (state = false, action) => {
  switch(action.type) {
    case START_LOADING:
      return true;
    case STOP_LOADING:
      return false;
    default:
      return state;
  }
};
