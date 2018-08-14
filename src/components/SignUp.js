import React, { Component } from 'react';
import { connect } from 'react-redux';

import { register, validateCode } from '../actions/auth';

import { validateEmail } from '../shared/emailValidator';

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
// import { processLogout } from '../actions/auth';

export class SignUp extends Component {
  state = {
    email: '',
    password: '',
    showPassword: false,
    code: '',
    modalOpened: false
  };

  modalStyle = () => {
    return {
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      position: 'absolute',
      background: 'ivory',
      width: '250px',
      height: '250px',
      textAlign: 'center',
      padding: '20px',
    };
  };

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleSignUp = async() => {
    try {
      await this.props.register(
        this.state.email,
        this.state.password
      );

      this.setState({
        modalOpened: !this.state.modalOpened
      });
    }
    catch(err) {
      console.log(err);
    }
  }

  handleCode = () => {
    this.props.validateCode(
      this.state.email,
      this.state.code
    );
  }

  render() {
    return(
      <div  style={{margin: '0 auto', width:'300px', textAlign:'center'}}>
        <h1>A.T.D.A.</h1>
        <h3>Sign Up</h3>

        <TextField
          id="email"
          label="Email"
          value={this.state.email}
          onChange={this.handleChange('email')}
          margin="normal"
        />
        <br /><br />

        <FormControl>
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
          onClick={this.handleSignUp}
        >
          Submit
        </Button>
        <br /><br />
        <Button variant="flat" color="default" href="/">
          Sign In
        </Button>
        &nbsp;&nbsp;|&nbsp;&nbsp;
        <Button variant="flat" color="default" onClick={()=>this.setState({modalOpened: true})}>
          Enter Code
        </Button>

        {/*   MODAL BEGIN   */}
        <Modal
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
          open={this.state.modalOpened}
          onClose={()=>this.setState({modalOpened: false})}
        >
          <div style={this.modalStyle()} >
            <div
              style={{float:'right'}}
              onClick={()=>this.setState({modalOpened: false})}
            >x</div>
            <br /><br />
            <b>Check your email for the code.</b>
            <TextField
              id="email"
              label="Email"
              value={this.state.email}
              onChange={this.handleChange('email')}
              margin="normal"
            />
            <br />
            <TextField
              id="code"
              label="Enter Code"
              value={this.state.code}
              onChange={this.handleChange('code')}
              margin="normal"
            />
            <br /><br />
            <Button
              variant="contained"
              color="primary"
              onClick={this.handleCode}
            >
              Submit
            </Button>
          </div>
        </Modal>
      {/*   MODAL END   */}
      </div>
    );
  }
};

export default connect(null, {
  register, validateCode
})(SignUp);
