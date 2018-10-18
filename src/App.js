import React from 'react';
import ErrorBoundary from 'react-error-boundary';
import { Router, Redirect } from '@reach/router';
import { fetch, setToken, getToken } from './fetch';
import Nav from './components/Nav';
import Search from './Search';
// import Artist from './suspense/Artist';
import Artist from './vanilla/Artist';

class App extends React.Component {
  state = {};
  setUser = user => this.setState({ user });

  componentDidMount() {
    this.getMe();
  }

  getMe = () => {
    if (getToken()) {
      fetch('https://api.spotify.com/v1/me')
        .then(res => res.json())
        .then(user => this.setState({ user }), error => console.log(error));
    }
  };

  render() {
    const token = getToken();
    return (
      <ErrorBoundary>
        <div className="app">
          {!token && (
            <div
              className="login"
              style={{
                position: 'fixed',
                right: 0,
                zIndex: 999,
                padding: '1rem',
              }}
            >
              <a href="https://accounts.spotify.com/authorize?client_id=7baf7bed653c410bbdc7966a1dd4e0b2&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback/">
                Login with Spotify
              </a>
            </div>
          )}
          <Router>
            <Nav default>
              <Auth path="/callback" user={this.state.user} />
              <Search path="/" />
              <Artist path="/artist/:id" />
            </Nav>
          </Router>
        </div>
      </ErrorBoundary>
    );
  }
}

class Auth extends React.Component {
  componentDidMount() {
    let hashParams = {};
    let e,
      r = /([^&;=]+)=?([^&;]*)/g,
      q = window.location.hash.substring(1);
    while ((e = r.exec(q))) {
      hashParams[e[1]] = decodeURIComponent(e[2]);
    }
    if (hashParams.access_token) {
      setToken(hashParams.access_token);
      window.location.href = '/';
    }
  }
  render() {
    if (this.props.user) {
      return <Redirect to="/" />;
    }
    return null;
  }
}
export default App;
