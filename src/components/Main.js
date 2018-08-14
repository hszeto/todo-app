import React, { Component } from 'react';
import { connect } from 'react-redux';

import Loader from './Loader';
// import { getCurrentUser, processLogout } from '../actions/auth';

export class Main extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //   };
  // }

  componentDidMount() {
    // this.props.getCurrentUser();
  }

  componentWillReceiveProps(nextProps) {
    // const { roles } = nextProps.currentUser;

    // if (roles && !roles.includes('portal_user')) {
    //   this.props.processLogout();
    //   alert('You are not authorized.');
    // }
  }

  onLogoutClick = () => {
    // this.props.processLogout();
  }

  onLinkClick = (tab) => {
    // this.setState({
    //   currentTab: tab
    // });
  };

  render() {
    return(
      <div>
        { this.props.isLoading ? <Loader /> : '' }
        <div>
          <h1>The Great To-Do's</h1>
          <button className='btn md grey'
            id='logout-btn'
            onClick={this.onLogoutClick}
          > Log Out
          </button>
        </div>
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  console.log( state );
  return({
    isLoading: state.isLoading,
    currentUser: state.currentUser
  })
};

export default connect(mapStateToProps, {
  // getCurrentUser, processLogout
})(Main);
