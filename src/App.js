import React from 'react';
import { Router, Redirect } from '@reach/router';
import { setToken, getToken } from './api/auth';
import { fetchMeJSON } from './api';
import { codeSplitComponent } from './codeSplitComponent';
import Nav from './components/Nav';
import LoginLink from './components/LoginLink';
import { Spinner } from './components/Spinner';

const SearchPage = React.lazy(() =>
  import('./vanilla/SearchPage').then(mod => mod.default)
);
const ArtistPage = React.lazy(() =>
  import('./vanilla/ArtistPage').then(mod => mod.default)
);
const AuthPage = React.lazy(() =>
  import('./vanilla/AuthPage').then(mod => mod.default)
);

class App extends React.Component {
  state = {};
  setUser = user => this.setState({ user });

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
        <React.Placeholder fallback={<Spinner size="large" />}>
          <Router>
            <Nav default>
              <SearchPage path="/" />
              <AuthPage path="/callback" user={this.state.user} />
              <ArtistPage path="/artist/:id" />
            </Nav>
          </Router>
        </React.Placeholder>
      </div>
    );
  }
}

export default App;
