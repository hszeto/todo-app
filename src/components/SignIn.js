import React, { Component } from 'react';
import { connect } from 'react-redux';

import { validateEmail } from '../shared/emailValidator';

import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputAdornment from '@material-ui/core/InputAdornment';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
// import { processLogout } from '../actions/auth';

export class SignIn extends Component {
  // constructor(props) {
  //   super(props);
  //   this.state = {
  //     email: ''
  //   };
  // }

  state = {
    email: '',
    password: '',
    showPassword: false,
  };

  componentWillMount() {
    localStorage.removeItem('ocspToken');
    // this.props.processLogout();
  }

  handleClickShowPassword = () => {
    this.setState({ showPassword: !this.state.showPassword });
  };

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    }, () => console.log( this.state ) );
  };

  render() {
    return(
      <div  style={{margin: '0 auto', width:'300px', textAlign:'center'}}>
        <h1>A.T.D.A</h1>
        <h3>Sign In</h3>

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

        <Button variant="contained" color="primary" size="large"
          disabled={(!validateEmail(this.state.email) || this.state.password.length < 6)}
        >
          Sign In
        </Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button variant="flat" color="default" href="/signup">
          Sign Up
        </Button>
      </div>
    );
  }
};

export default connect(null, {
  // processLogout
})(SignIn);
