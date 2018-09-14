export const Auth = {
  currentSession:       jest.fn(() => Promise.resolve()),
  signIn:               jest.fn(() => Promise.resolve()),
  signOut:              jest.fn(() => Promise.resolve()),
  signUp:               jest.fn(() => Promise.resolve()),
  confirmSignUp:        jest.fn(() => Promise.resolve()),
  forgotPassword:       jest.fn(() => Promise.resolve()),
  forgotPasswordSubmit: jest.fn(() => Promise.resolve()),
};
