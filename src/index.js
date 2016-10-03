import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.css';


let messages = { name: " Test App", greeting: " Hello!!! ", modalState: true};
ReactDOM.render(
  <App {...messages}/>,  
  document.getElementById('root')
);
