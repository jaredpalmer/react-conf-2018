import React from 'react';

import { Router, Link } from '@reach/router';
import { fetch, setToken } from './fetch';
import Search from './Search';
import Artist from './Artist/Artist';
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
    return null;
  }
}
class App extends React.Component {
  state = {};

  componentDidMount() {
    this.getMe();
  }

  getMe = () => {
    fetch('https://api.spotify.com/v1/me')
      .then(res => res.json())
      .then(
        user => console.log(user) || this.setState({ user }),
        error => console.log(error)
      );
  };

  render() {
    console.log(this.state);

    if (this.state.user === null) {
      return (
        <div className="login">
          <a href="https://accounts.spotify.com/authorize?client_id=7baf7bed653c410bbdc7966a1dd4e0b2&scope=playlist-read-private%20playlist-read-collaborative%20playlist-modify-public%20user-read-recently-played%20playlist-modify-private%20ugc-image-upload%20user-follow-modify%20user-follow-read%20user-library-read%20user-library-modify%20user-read-private%20user-read-email%20user-top-read%20user-read-playback-state&response_type=token&redirect_uri=http://localhost:3000/callback/">
            Login with Spotify
          </a>
        </div>
      );
    }

    return (
      <div className="app">
        <div className="nav">
          <Link to="/" className="logo">
            <span role="img" aria-label="piano">
              🎹
            </span>
            Spotify
          </Link>
        </div>
        <Router>
          <Auth path="/callback" />
          <Search path="/" />
          <Artist path="/a/:id" />
        </Router>
      </div>
    );
  }
}

export default App;
