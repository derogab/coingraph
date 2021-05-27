import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

it('renders without crashing', () => {

  // "Official" workaround
  // https://stackoverflow.com/questions/39830580/jest-test-fails-typeerror-window-matchmedia-is-not-a-function
  Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: jest.fn().mockImplementation(query => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  const socket = {
    on: jest.fn()
  }
  const div = document.createElement('div');
  ReactDOM.render(<App socket={socket} />, div);
  ReactDOM.unmountComponentAtNode(div);
});
