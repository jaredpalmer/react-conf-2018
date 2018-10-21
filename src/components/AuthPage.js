import React from 'react';
import { setToken } from '../api/auth';
import { Redirect } from '@reach/router';

export default class AuthPage extends React.Component {
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
