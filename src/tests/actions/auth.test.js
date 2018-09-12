import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import fetchMock from 'fetch-mock';

import history from '../../components/History';
import { SET_USER, SIGN_IN, SIGN_OUT,
         START_LOADING, STOP_LOADING } from '../../shared/constants';
import { authenticate } from '../../actions/auth';

// Mock instead of importing the library
const Auth = jest.mock('aws-amplify');

// Mock Redux
let createMockStore = {};
let store = {};

beforeEach(() => {
  createMockStore = configureMockStore([thunk]);
  store = createMockStore(
    { 
      currentUser: {
        cognitoUser: {},
        email: '',
        jwt: '',
        uuid: ''
      },
      isAuthenticated: false,
      isLoading: false,
      todos: []
    }
  );
});

// Clear fetchMock
afterEach(() => {
  fetchMock.restore();
});


describe('Authenticate', () => {
  it('sign in', () => {
    const expectedActions = [
      {type: START_LOADING},{type: SET_USER},
      {type: SIGN_IN}, {type: STOP_LOADING}
    ];

    return store
      .dispatch(authenticate('testy@test.com', 'asdfasdf'))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      });
  });
});
