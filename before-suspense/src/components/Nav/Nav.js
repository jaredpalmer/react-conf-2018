import React from 'react';
import { Link } from '@reach/router';
import { PlayerContext } from '../PlayerProvider';
import { Spinner } from '../Spinner';
import IconPause from '../Icon/IconPause';
import IconPlay from '../Icon/IconPlay';
import { IconSuspensify } from '../Icon/IconSuspensify';
import { Match } from '@reach/router';

function Nav(props) {
  return (
    <div>
      <Match path="/artist/:id">
        {props =>
          props.match ? (
            <div
              className="nav row"
              style={{ justifyContent: 'space-between', zIndex: 9999 }}
            >
              <Link to="/" className="logo">
                <IconSuspensify style />
              </Link>{' '}
              <PlayerContext.Consumer>
                {({
                  currentTrack,
                  play,
                  pause,
                  isPlaying,
                  isLoading,
                }) => {
                  return currentTrack ? (
                    <div
                      className="row"
                      role="button"
                      onClick={
                        isPlaying
                          ? pause(currentTrack)
                          : play(currentTrack)
                      }
                    >
                      {isPlaying ? (
                        isLoading ? (
                          <Spinner className="small" />
                        ) : (
                          <IconPause height="16" width="16" />
                        )
                      ) : (
                        <IconPlay height="16" width="16" />
                      )}
                      <div
                        style={{
                          marginLeft: 8,
                          fontSize: 12,
                          lineHeight: 1,
                        }}
                      >
                        {currentTrack.name}
                      </div>
                    </div>
                  ) : (
                    <div />
                  );
                }}
              </PlayerContext.Consumer>
            </div>
          ) : null
        }
      </Match>
      <div className="main">{props.children}</div>
    </div>
  );
}

export default Nav;
