import { Auth } from 'aws-amplify';
import history from '../components/History'
import { SET_USER, SIGN_IN,
         START_LOADING, STOP_LOADING } from '../shared/constants';

export const authenticate = (email, password) => {
  return dispatch => {
    dispatch({ type: START_LOADING });

    Auth.signIn(email, password)
      .then(user => {
        history.push('/main');

        dispatch({ type: SIGN_IN });

        dispatch({
          type: SET_USER,
          payload: user
        });

        dispatch({ type: STOP_LOADING });
      })
      .catch(err => {
        handleError(err);

        dispatch({ type: STOP_LOADING });
      });
  }
};

export const register = (email, password) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      Auth.signUp({
          username: email,
          password: password,
          attributes: {
            email: email
          }
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

const handleError = (err) => {
  const msg = err.message || err;
  console.log(msg);
  alert(msg);
};
