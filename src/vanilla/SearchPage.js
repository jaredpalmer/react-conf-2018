import React from 'react';

import { unstable_scheduleCallback } from 'scheduler';
import { Spinner } from '../components/Spinner';
import ListItem from '../components/ListItem';
import { searchArtistsJSON } from '../api';
import { createResource } from 'react-cache';
import { cache } from '../cache';

const ArtistsResource = createResource(searchArtistsJSON);

class Search extends React.Component {
  state = {
    value: '',
    asyncValue: '',
    isLoading: false,

    currentId: null,
  };

  search = query => {
    this.setState({ isLoading: true });
    if (query.trim() !== '') {
      searchArtistsJSON(query);
    }
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
    const { currentId, value, asyncValue } = this.state;

    return (
      <div className="search">
        <input className="input" value={value} onChange={this.handleChange} />
        <React.Placeholder fallback={<Spinner />}>
          {value !== '' &&
          ArtistsResource.read(cache, asyncValue).length > 0 ? (
            ArtistsResource.read(cache, asyncValue).map(
              item =>
                item ? (
                  <ListItem
                    to={`/artist/${item.id}`}
                    onClick={currentId => this.setState({ currentId })}
                    key={item.id}
                    item={item}
                    currentId={currentId}
                  />
                ) : null
            )
          ) : (
            <div className="empty">No Results Found. Search for artists.</div>
          )}
        </React.Placeholder>
      </div>
    );
  }
}

export default Search;
