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
      <div>
        <div id="header">
          <div>Hi: {this.props.currentUser.email}</div>
          &nbsp;
          <Button
            id='logout-btn'
            variant="contained"
            color="primary"
            onClick={this.onLogoutClick}
          > Log Out
          </Button>
        </div>
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
