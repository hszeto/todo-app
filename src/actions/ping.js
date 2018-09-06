const apiEndPoints = require('../shared/apiEndPoints.js');

export const pingServer = () => {
  return dispatch => {
    return fetch(`${apiEndPoints.domain}/readiness`, {
        method: "GET"
      })
        .then(res => res.ok ? res.json() : Promise.reject(res))
        .then(json => console.log( "Server Ready..." ))
        .catch(err => console.log(err));
  }
};
