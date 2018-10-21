import React from 'react';
import { fetch } from './fetch';
import { unstable_scheduleCallback } from 'scheduler';
import { Spinner } from './components/Spinner';
import ListItem from './components/ListItem';
class Search extends React.Component {
  state = {
    value: '',
    asyncValue: '',
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

  handleChange = event => {
    event.persist();
    this.setState({ value: event.target.value });
    unstable_scheduleCallback(() => {
      this.setState({ asyncValue: event.target.value }, () =>
        this.search(this.state.asyncValue)
      );
    });
  };

  render() {
    const { isLoading, currentId, results, value } = this.state;

    return (
      <div className="search">
        <input value={value} onChange={this.handleChange} />
        {isLoading ? (
          <Spinner size="large" />
        ) : results && results.artists && results.artists.items.length > 0 ? (
          results.artists.items.map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={currentId}
            />
          ))
        ) : null}
      </div>
    );
  }
}

export default Search;
