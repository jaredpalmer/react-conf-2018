import React from 'react';
import ReactDOM from 'react-dom';
import App, { Debugger } from './Root';
import './index.scss';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

ReactDOM.render(<Debugger />, document.getElementById('debugger'));
