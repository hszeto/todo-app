import React  from 'react';
import { connect } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

export const ProtectedRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={ props =>
      rest.isAuthenticated ? (
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: "/",
            state: { from: props.location }
          }}
        />
      )
    }
  />
);

const mapStateToProps = (state) => {
  return{ isAuthenticated: state.isAuthenticated };
};

export default connect(mapStateToProps)(ProtectedRoute);
