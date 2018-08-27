import { SET_TODOS } from '../shared/constants';

const apiEndPoints = require('../shared/apiEndPoints.js');

export const createItem = (name, todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}/items`;
    const body = JSON.stringify({ name: name });

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

export const updateItemStatus = (completed, itemId, todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}/items/${itemId}`;
    const body = JSON.stringify({ completed: completed });

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


export const updateItemName = (name, itemId, todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}/items/${itemId}`;
    const body = JSON.stringify({ name: name });

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

export const deleteItem = (itemId, todoId, jwt) => {
  return dispatch => {
    const url = `${apiEndPoints.domain}/todos/${todoId}/items/${itemId}`;

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
