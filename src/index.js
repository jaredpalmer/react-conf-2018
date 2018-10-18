import React from 'react';
import { unstable_createRoot as createRoot } from 'react-dom';
import './index.scss';
import App from './App';
const root = createRoot(document.getElementById('root'));
root.render(<App />);

// ReactDOM.render(<App />, document.getElementById('root'));
