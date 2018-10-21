import React from 'react';

import { unstable_scheduleCallback } from 'scheduler';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
import { searchArtistsJSON } from '../api';
import { trimExt } from 'upath';

class Search extends React.Component {
  state = {
    value: '',
    asyncValue: '',
    isLoading: false,

    currentId: null,
  };

  search = query => {
    this.setState({ isLoading: true });
    searchArtistsJSON(query).then(
      results => this.setState({ results, isLoading: false }),
      error => console.log(error)
    );
  };

  handleChange = event => {
    event.persist();
    this.setState({ value: event.target.value });
    // Search with the new hip, low-priority version of state
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
        <input className="input" value={value} onChange={this.handleChange} />
        {isLoading ? (
          <Spinner size="large" />
        ) : results && results.length > 0 ? (
          results.map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={currentId}
            />
          ))
        ) : (
          <div className="empty">No Results Found. Search for artists.</div>
        )}
      </div>
    );
  }
}

export default Search;
