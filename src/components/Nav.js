import React from 'react';
import { Link } from '@reach/router';

function Nav() {
  return (
    <div className="nav">
      <Link to="/" className="logo">
        <span role="img" aria-label="piano">
          🎹
        </span>
        Spotify
      </Link>
    </div>
  );
}

export default Nav;
