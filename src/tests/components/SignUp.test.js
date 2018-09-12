import React from 'react';
import { shallow } from 'enzyme';
import { SignUp } from '../../components/SignUp';

// Mock props
const props = {};
// props.processLogout = jest.fn();

let signUp = shallow(<SignUp {...props} />);

describe('SignUp', () => {
  it('renders correctly', () => {
    expect(signUp).toMatchSnapshot();
  });
});
