import { SET_USER } from '../shared/constants';

const INITIAL_STATE = {
  cognitoUser: {},
  email: '',
  jwt: '',
  uuid: ''
};

export default (state = INITIAL_STATE, action) => {
  switch(action.type) {
    case SET_USER:
      return { ...state,
        cognitoUser:action.payload,
        email: action.payload.signInUserSession.idToken.payload.email,
        jwt: action.payload.signInUserSession.idToken.jwtToken,
        uuid: action.payload.username
      };
    default:
      return state;
  }
};
