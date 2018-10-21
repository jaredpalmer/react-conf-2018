import React, { unstable_Suspense as Suspense } from 'react';
import { Router } from '@reach/router';
import { getToken } from './api/auth';
import { fetchMeJSON } from './api';
import { codeSplitComponent } from './codeSplitComponent';
import Nav from './components/Nav/Nav';
import LoginLink from './components/Nav/LoginLink';
import { Spinner } from './components/Spinner';

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
        <Suspense maxDuration={1000} fallback={<Spinner size="large" />}>
          <Router>
            <Nav default>
              <SearchPage path="/" />
              <AuthPage path="/callback" user={this.state.user} />
              <ArtistPage path="/artist/:id" />
            </Nav>
          </Router>
        </Suspense>
      </div>
    );
  }
}

export default App;
