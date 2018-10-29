import React from 'react';
import { IconSuspensify } from './IconSuspensify';

export function Logo(props) {
  return (
    <div
      className="row"
      style={{
        margin: '0 auto 3rem',
        maxWidth: 220,
        justifyContent: 'flex-start',
      }}
    >
      <IconSuspensify size={2} />
      <h1 style={{ marginLeft: 14 }}>Suspensify</h1>
    </div>
  );
}

Logo.displayName = 'Logo';
