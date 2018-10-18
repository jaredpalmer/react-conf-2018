import React from 'react';
import { Link } from '@reach/router';

function Nav(props) {
  return (
    <div>
      <div className="nav">
        <Link to="/" className="logo">
          <span role="img" aria-label="piano">
            🎹
          </span>
          Spotify
        </Link>
      </div>
      <div className="main">{props.children}</div>
    </div>
  );
}

export default Nav;
