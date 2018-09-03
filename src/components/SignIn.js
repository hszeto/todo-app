import React, { Component } from 'react';
import { connect } from 'react-redux';

import { authenticate, resetPassword,
         validateResetPasswordCode } from '../actions/auth';

import { validateEmail } from '../shared/emailValidator';
import Loader from './Loader';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import Modal from '@material-ui/core/Modal';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

export class SignIn extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    newPassword: '',
    showNewPassword: false,
    code: '',
    modalOpened: false
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleClickShowNewPassword = () => {
    this.setState({ showNewPassword: !this.state.showNewPassword });
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
  };

  handleResetPassword = () => {
    this.props.resetPassword(this.state.email);
  };

  handleResetPasswordCode = async () => {
    try {
      const {email, code, newPassword } = this.state;

      await this.props.validateResetPasswordCode( email, code, newPassword );

      this.setState({
        modalOpened: !this.state.modalOpened
      });
    }
    catch(err) {
      console.log(err);
    }
  };

  render() {
    return(
      <div>
        { this.props.isLoading 
          ? <Loader /> 
          : <div className="auth-card-outer" id="sign-in">
              <div className="auth-card-inner">
                <h1>React JS To-Do App</h1>
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
                <Button variant="flat" color="default" onClick={()=>this.setState({modalOpened: true})}>
                  Forgot password
                </Button>

                {/*   MODAL BEGIN   */}
                <Modal
                  aria-labelledby="simple-modal-title"
                  aria-describedby="simple-modal-description"
                  open={this.state.modalOpened}
                  onClose={()=>this.setState({modalOpened: false})}
                >
                  <div className="modal" >
                    <div
                      style={{float:'right'}}
                      onClick={()=>this.setState({modalOpened: false})}
                    >x</div>
                    <br /><br />
                    <b>A code will be sent to you email</b>
                    <TextField
                      label="Email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                    <br /><br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleResetPassword}
                    >
                      Request Code
                    </Button>

                    <br /><br /><hr /><br />

                    <b>If you have the code,<br />enter your email, code<br />and new password</b>
                    <TextField
                      label="Email"
                      value={this.state.email}
                      onChange={this.handleChange('email')}
                      margin="normal"
                    />
                    <TextField
                      id="code"
                      label="Enter Code"
                      value={this.state.code}
                      onChange={this.handleChange('code')}
                      margin="normal"
                    />
                    <FormControl className="full-width">
                      <InputLabel htmlFor="adornment-password">New Password</InputLabel>
                      <Input
                        id="adornment-password"
                        type={this.state.showNewPassword ? 'text' : 'password'}
                        value={this.state.newPassword}
                        onChange={this.handleChange('newPassword')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="Toggle password visibility"
                              style={{color: this.state.newPassword.length < 6 ? 'grey' : 'green'}}
                              onClick={this.handleClickShowNewPassword}
                              onMouseDown={e => e.preventDefault()}
                            >
                              {this.state.handleClickShowNewPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    </FormControl>
                    <br /><br />
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={this.handleResetPasswordCode}
                    >
                      Submit
                    </Button>
                  </div>
                </Modal>
                {/*   MODAL END   */}
                <div className="auth-footer">
                  Authentications powered by <a href="https://aws-amplify.github.io/amplify-js/media/authentication_guide.html" target="_blank" rel="noopener noreferrer">AWS Cognito</a>
                  <br /><br />
                  <a href="https://www.henryszeto.com" target="_blank" rel="noopener noreferrer">Henry Szeto</a> 2018
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
  authenticate, resetPassword, validateResetPasswordCode
})(SignIn);
