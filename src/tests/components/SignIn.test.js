import React from 'react';
import { shallow } from 'enzyme';
import { SignIn } from '../../components/SignIn';

// Mock props
const props = {};
// props.processLogout = jest.fn();

let signIn = shallow(<SignIn {...props} />);

describe('SignIn', () => {
  it('renders correctly', () => {
    expect(signIn).toMatchSnapshot();
  });
});
