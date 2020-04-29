import AddToHomeScreen from 'a2hs.js';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';

ReactDOM.render(
  <App />,
  document.getElementById('root'),
);

// add to home screen
AddToHomeScreen({
  brandName: 'My Work',
});
