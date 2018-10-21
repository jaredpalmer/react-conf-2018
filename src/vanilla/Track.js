import React from 'react';
import { Spinner } from '../components/Spinner';
import IconPause from '../components/IconPause';
import IconPlay from '../components/IconPlay';

class Player extends React.Component {
  didMount = false;
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { url } = this.props;
    this.didMount = true;
    this.audio = new Audio(url);
    this.audio.onloadeddata = () => {
      this.setState({ isLoading: false });
      this.audio.play();
    };
  }

  componentWillUnmount() {
    if (this.didMount && this.audio) {
      this.audio.pause();
    }
  }

  handlePause = () => {
    this.audio.pause();
    this.props.onPause();
  };

  render() {
    const { isLoading } = this.state;
    return (
      <div role="button" onClick={this.handlePause}>
        {isLoading ? <Spinner className="avatar" /> : <IconPause />}
      </div>
    );
  }
}

export function Track({ track, currentId, play, pause }) {
  return (
    <div className="item track" key={track.id}>
      {currentId === track.id ? (
        <Player url={track.preview_url} onPause={pause(track.id)} />
      ) : (
        <IconPlay onClick={play(track.id)} />
      )}

      <div className="col">
        <div className="name">{track.name}</div>
        <div className="meta">{track.type.toUpperCase()}</div>
      </div>
    </div>
  );
}
