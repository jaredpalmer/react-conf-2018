import React, { useState, useEffect } from 'react';
import { Spinner } from '../components/Spinner';
import IconPause from '../components/IconPause';
import IconPlay from '../components/IconPlay';

class Player extends React.Component {
  state = {
    isLoading: true,
  };

  componentDidMount() {
    const { url } = this.props;
    this.audio = new Audio(url);
    this.audio.onloadeddata = () => {
      this.setState({ isLoading: false });
      this.audio.play();
    };
  }

  componentWillUnmount() {
    this.audio.pause();
    this.props.onPause();
  }
  handleClick = () => {
    this.props.onPause();
  };
  render() {
    const { isLoading } = this.state;
    return (
      <div role="button" onClick={this.handleClick}>
        {isLoading ? <Spinner className="avatar" /> : <IconPause />}
      </div>
    );
  }
}

export class Track extends React.Component {
  state = {
    isPlaying: false,
  };

  handlePause = () => this.setState({ isPlaying: false });
  handlePlay = () => this.setState({ isPlaying: true });
  render() {
    const { isPlaying } = this.state;
    const { track } = this.props;
    return (
      <div className="item track" key={track.id}>
        {isPlaying ? (
          <Player url={track.preview_url} onPause={this.handlePause} />
        ) : (
          <IconPlay />
        )}

        <div className="col">
          <div className="name">{track.name}</div>
          <div className="meta">{track.type.toUpperCase()}</div>
        </div>
      </div>
    );
  }
}
