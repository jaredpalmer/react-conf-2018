import React from 'react';
import ReactDOM from 'react-dom';
import App, { Debugger } from './Root';
import './index.scss';

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
ReactDOM.render(<Debugger />, document.getElementById('debugger'));
