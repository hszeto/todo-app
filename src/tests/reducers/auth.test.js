import authReducer from '../../reducers/auth';
import { SIGN_IN, SIGN_OUT } from '../../shared/constants';

describe('authReducer', () => {
  it('sign in', () => {
    expect(
      authReducer( false, { type: SIGN_IN })
    ).toEqual(true);
  });

  it('sign out', () => {
    expect(
      authReducer( true, { type: SIGN_OUT })
    ).toEqual(false);
  });
});
