import React from 'react';
// import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
import { unstable_createRoot as createRoot } from 'react-dom';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// ReactDOM.render(<App />, document.getElementById('root'));
