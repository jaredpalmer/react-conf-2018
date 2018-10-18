import React from 'react';
import { fetch } from './fetch';

import { Spinner } from './components/Spinner';
import ListItem from './components/ListItem';
class Search extends React.Component {
  state = {
    isLoading: true,
    results: [],
    currentId: null,
  };

  componentDidMount() {
    this.search();
  }

  search = (query = 'beatles') => {
    this.setState({ isLoading: true });
    fetch(
      `https://api.spotify.com/v1/search?q=${query.trim()}&type=artist,album`
    )
      .then(res => res.json())
      .then(
        results => this.setState({ results: results, isLoading: false }),
        error => console.log(error)
      );
  };

  render() {
    const { isLoading, currentId } = this.state;
    if (isLoading) {
      return <Spinner />;
    }
    return (
      <div className="search">
        {this.state.results &&
          this.state.results.artists &&
          this.state.results.artists.items.length > 0 &&
          this.state.results.artists.items.map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={currentId}
            />
          ))}
      </div>
    );
  }
}

export default Search;
