import { Auth } from 'aws-amplify';
import history from '../components/History'
import { SET_USER, SIGN_IN, SIGN_OUT,
         START_LOADING, STOP_LOADING } from '../shared/constants';

export const authenticate = (email, password) => {
  return dispatch => {
    dispatch({ type: START_LOADING });

    Auth.signIn(email, password)
      .then(user => {
        dispatch({
          type: SET_USER,
          payload: user
        });

        history.push('/main');

        dispatch({ type: SIGN_IN });

        dispatch({ type: STOP_LOADING });
      })
      .catch(err => {
        handleError(err);

        dispatch({ type: STOP_LOADING });
      });
  }
};

export const register = (email, password) => {
  console.log( "*** register ***" );
  console.log( email );
  console.log( password );
  return dispatch => {
    return new Promise((resolve, reject) => {
      Auth.signUp({
          username: email,
          password: password
        })
        .then(data => {
          resolve();
        })
        .catch(err => {
          handleError(err);
          reject();
        });
    })
  }
};

export const validateCode = (email, code) => {
  return dispatch => {
    Auth.confirmSignUp(email, code)
      .then(data => {
        console.log(data);
        alert("Registration success! Please login now.");
        history.push('/');
      })
      .catch(err => {
        handleError(err);
      });
  }
};

export const signOut = () => {
  return dispatch => {
    Auth.signOut()
      .then(data => {
        dispatch({ type: SIGN_OUT });
      })
      .catch(err => {
        handleError(err);
      });
  }
}

const handleError = (err) => {
  const msg = err.message || err;
  console.log(msg);
  alert(msg);
};
