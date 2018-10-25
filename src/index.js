import React, { Fragment, PureComponent } from 'react';
import { createRoot, render } from 'react-dom';
import { unstable_trace as trace } from 'scheduler/tracing';

import {
  setFakeRequestTime,
  setPaused,
  setPauseNewRequests,
  setProgressHandler,
} from './api';
import App from './App';
import Draggable from 'react-draggable';
import './index.scss';
import Debugger from './Debugger';

let handleReset;

class Shell extends PureComponent {
  state = {
    iteration: 0,
  };

  componentDidMount() {
    handleReset = this.handleReset;
  }

  handleReset = () =>
    this.setState(prevState => ({
      iteration: prevState.iteration + 1,
    }));

  render() {
    return <App key={this.state.iteration} />;
  }
}

createRoot(document.getElementById('root')).render(<Shell />);

render(
  <Debugger handleReset={handleReset} />,
  document.getElementById('debugger')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('root')
// );
