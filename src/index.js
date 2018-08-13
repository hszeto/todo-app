import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import { Router, Route } from 'react-router-dom';

import './index.css';
// import App from './App';
import registerServiceWorker from './registerServiceWorker';
import rootReducer from './reducers';

import history from './components/History'
import ProtectedRoute from './components/ProtectedRoute';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import Main from './components/Main';

const store = createStore(rootReducer, applyMiddleware(thunk));

ReactDOM.render(
  <Provider store={store}>
    <Router history={history} >
      <div>
        <Route exact path="/" component={SignIn} />
        <Route exact path="/signup" component={SignUp} />
        <ProtectedRoute path="/main" component={Main} />
      </div>
    </Router>
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
