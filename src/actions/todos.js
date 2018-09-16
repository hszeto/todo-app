import { SET_TODOS } from '../shared/constants';

const apiEndPoints = require('../shared/apiEndPoints.js');

export const getTodos = (jwt) => {
  return dispatch => {
    return new Promise((resolve, reject) => {
      return fetch(`${apiEndPoints.domain}/todos`, {
        method: "GET",
        headers: {
          "Authorization": `${jwt}`
        }
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          dispatch({
            type: SET_TODOS,
            payload: json
          });

          resolve(true);
        })
        .catch(err => {
          alert("Error: " + (err.statusText || err));

          reject( err );
        });
    });
  }
};

export const createTodo = (title, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos`;
    const body = JSON.stringify({ title: title });

    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: "POST",
        headers: {
          "Authorization": `${jwt}`,
          "Content-Type": "application/json"
        },
        body: body
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          dispatch({
            type: SET_TODOS,
            payload: json
          });

          resolve(true);
        })
        .catch(err => {
          alert("Error: " + err.statusText);

          reject( err );
        });
    });
  }
};

export const updateTodoName = (title, todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}`;
    const body = JSON.stringify({ title: title });

    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: "PUT",
        headers: {
          "Authorization": `${jwt}`,
          "Content-Type": "application/json"
        },
        body: body
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          dispatch({
            type: SET_TODOS,
            payload: json
          });

          resolve(true);
        })
        .catch(err => {
          alert("Error: " + err.statusText);

          reject( err );
        });
    });
  }
};

export const deleteTodo = (todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}`;

    return new Promise((resolve, reject) => {
      return fetch(url, {
        method: "DELETE",
        headers: {
          "Authorization": `${jwt}`
        }
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => {
          dispatch({
            type: SET_TODOS,
            payload: json
          });

          resolve(true);
        })
        .catch(err => {
          alert("Error: " + err.statusText);

          reject( err );
        });
    });
  }
};
