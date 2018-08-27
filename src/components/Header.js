import React, { Component } from 'react';
import { connect } from 'react-redux';

import { signOut } from '../actions/auth';

import Button from '@material-ui/core/Button';

export class Header extends Component {
  onLogoutClick = () => {
    this.props.signOut();
  }

  render() {
    return(
      <div id="header">
        <span>Hello: {this.props.currentUser.email}</span>
        <Button
          id='logout-btn'
          variant="contained"
          color="primary"
          className="pull-right"
          onClick={this.onLogoutClick}
        > Log Out
        </Button>
        <hr />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return({
    currentUser: state.currentUser
  })
};

export default connect(mapStateToProps, {
  signOut
})(Header);
