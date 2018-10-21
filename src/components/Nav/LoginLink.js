import React from 'react';

function LoginLink() {
  return (
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
  );
}

export default LoginLink;
