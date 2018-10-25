import React from 'react';
import { Router } from '@reach/router';
import { getToken } from './api/auth';
import { fetchMeJSON } from './api';
import Nav from './components/Nav/Nav';
import LoginLink from './components/Nav/LoginLink';
import PlayerProvider from './components/PlayerProvider';
import { codeSplitComponent } from './codeSplitComponent';

const SearchPage = codeSplitComponent(() =>
  import('./components/SearchPage').then(mod => mod.default)
);
const ArtistPage = codeSplitComponent(() =>
  import('./components/ArtistPage').then(mod => mod.default)
);
const AuthPage = codeSplitComponent(() =>
  import('./components/AuthPage').then(mod => mod.default)
);

class App extends React.Component {
  state = {};
  pause = currentId => () => {
    this.setState({ currentId: undefined });
  };

  play = currentId => () => {
    this.setState({ currentId });
  };

  componentDidMount() {
    if (getToken()) {
      fetchMeJSON().then(
        user => this.setState({ user }),
        error => console.log(error)
      );
    }
  }
  render() {
    const token = getToken();
    return (
      <div className="app">
        {!token && <LoginLink />}

        <PlayerProvider>
          <Router>
            <Nav default>
              <SearchPage path="/" />
              <AuthPage path="/callback" user={this.state.user} />
              <ArtistPage
                path="/artist/:id"
                play={this.play}
                pause={this.pause}
              />
            </Nav>
          </Router>
        </PlayerProvider>
      </div>
    );
  }
}

export default App;
