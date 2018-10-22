import React from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import App from './App';
// import { unstable_createRoot as createRoot } from 'react-dom';
// const root = createRoot(document.getElementById('root'));
// root.render(

// );

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
