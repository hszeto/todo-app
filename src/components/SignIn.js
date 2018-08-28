import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate } from '../actions/auth';

import { validateEmail } from '../shared/emailValidator';
import Loader from './Loader';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSignIn = () => {
    this.props.authenticate(
      this.state.email,
      this.state.password
    );
  }

  render() {
    return(
      <div>
        { this.props.isLoading 
          ? <Loader /> 
          : <div className="auth-card-outer">
              <div className="auth-card-inner">
                <h1>A.T.D.A.</h1>
                <h3>Sign In</h3>
                <TextField
                  id="email"
                  label="Email"
                  value={this.state.email}
                  onChange={this.handleChange('email')}
                  className="full-width"
                  margin="normal"
                />
                <br /><br />

                <FormControl className="full-width">
                  <InputLabel htmlFor="adornment-password">Password</InputLabel>
                  <Input
                    id="adornment-password"
                    type={this.state.showPassword ? 'text' : 'password'}
                    value={this.state.password}
                    onChange={this.handleChange('password')}
                    endAdornment={
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="Toggle password visibility"
                          style={{color: this.state.password.length < 6 ? 'grey' : 'green'}}
                          onClick={this.handleClickShowPassword}
                          onMouseDown={e => e.preventDefault()}
                        >
                          {this.state.showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    }
                  />
                </FormControl>
                <br /><br /><br />

                <Button
                  variant="contained"
                  color="primary"
                  fullWidth={true}
                  disabled={(!validateEmail(this.state.email) || this.state.password.length < 6)}
                  onClick={this.handleSignIn}
                >
                  Sign In
                </Button>
                <br /><br />
                <Button variant="flat" color="default" href="/signup">
                  Sign Up
                </Button>
                &nbsp;&nbsp;|&nbsp;&nbsp;
                <Button variant="flat" color="default" href="/">
                  Forgot password
                </Button>
                <div className="auth-footer">
                  Authentications powered by Amazon Cognito
                </div>
              </div>
            </div>
        }
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return({
    isLoading: state.isLoading,
    currentUser: state.currentUser
  })
};

export default connect(mapStateToProps, {
  authenticate
})(SignIn);
