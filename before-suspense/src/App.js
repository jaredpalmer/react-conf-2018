import React from 'react';
import { Router } from '@reach/router';
import Nav from './components/Nav/Nav';
import PlayerProvider from './components/PlayerProvider';
import { codeSplitComponent } from './codeSplitComponent';

const HomePage = codeSplitComponent(() =>
  import('./components/HomePage').then(mod => mod.default)
);
const ArtistPage = codeSplitComponent(() =>
  import('./components/ArtistPage').then(mod => mod.default)
);

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <PlayerProvider>
          <Router>
            <Nav default>
              <HomePage path="/" />
              <ArtistPage path="/artist/:id" />
            </Nav>
          </Router>
        </PlayerProvider>
      </div>
    );
  }
}

export default App;
