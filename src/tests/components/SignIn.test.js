import React from 'react';
// import { shallow } from 'enzyme';
import { createShallow } from '@material-ui/core/test-utils';
import { SignIn } from '../../components/SignIn';

// Mock props
const props = {};
props.authenticate = jest.fn();
props.pingServer = jest.fn();
props.resetPassword = jest.fn();
props.validateResetPasswordCode = jest.fn();

describe('SignIn', () => {
  let shallow;

  beforeEach(() => {
    shallow = createShallow();
  });


  it('renders correctly', () => {
    const signIn = shallow(<SignIn {...props} />);

    expect(signIn).toMatchSnapshot();
  });

  it('initial state', () => {
    const signIn = shallow(<SignIn {...props} />);

    expect(signIn.state()).toEqual({
      "code": "",
      "email": "",
      "modalOpened": false,
      "newPassword": "",
      "password": "",
      "showNewPassword": false,
      "showPassword": false
    })
  });

  it('componentDidMount', async () => {
    const signIn = shallow(<SignIn {...props} />);

    await signIn.instance().componentDidMount();
    expect(props.pingServer).toHaveBeenCalled();
  });

  it('enter email', () => {
    const signIn = shallow(<SignIn {...props} />);

    signIn.find('#email').simulate('change',
      { target: { value: 'testy@example.com' } });

    expect(signIn.state().email).toEqual('testy@example.com');
  });

  it('enter password', () => {
    const signIn = shallow(<SignIn {...props} />);

    signIn.find('.current-password').simulate('change',
      { target: { value: 'password' } });

    expect(signIn.state().password).toEqual('password');
  });

  it('sign in', () => {
    const signIn = shallow(<SignIn {...props} />);

    signIn.find('#email').simulate('change',
      { target: { value: 'testy@example.com' } });

    signIn.find('.current-password').simulate('change',
      { target: { value: 'password' } });

    signIn.find('#signIn-btn').simulate('click');

    expect(props.authenticate).toHaveBeenCalled();
  });
});
