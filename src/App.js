import React, { Suspense } from 'react';
import { Router } from '@reach/router';
import Nav from './components/Nav/Nav';
import PlayerProvider from './components/PlayerProvider';
import { Spinner } from './components/Spinner';

const HomePage = React.lazy(() => import('./components/HomePage'));
const ArtistPage = React.lazy(() => import('./components/ArtistPage'));

class App extends React.Component {
  render() {
    return (
      <div className="app">
        <PlayerProvider>
          <Suspense fallback={<Spinner size="large" />}>
            <Router>
              <Nav default>
                <HomePage path="/" />
                <ArtistPage path="/artist/:id" />
              </Nav>
            </Router>
          </Suspense>
        </PlayerProvider>
      </div>
    );
  }
}

export default App;
