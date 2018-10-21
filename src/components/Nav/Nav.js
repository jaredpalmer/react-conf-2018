import React from 'react';
import { Link } from '@reach/router';

function Nav(props) {
  return (
    <div>
      <div className="nav row">
        <Link to="/" className="logo">
          <span role="img" aria-label="piano">
            Spotifizzle
          </span>
        </Link>{' '}
      </div>
      <div className="main">{props.children}</div>
    </div>
  );
}

export default Nav;
