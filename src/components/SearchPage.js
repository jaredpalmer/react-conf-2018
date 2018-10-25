import React from 'react';

import { Spinner } from './Spinner';
import ListItem from './ListItem';
import { searchArtistsJSON } from '../api';
import { Logo } from './Icon/Logo';
import { debounce } from './utils';
import { IconSearch } from './Icon/IconSearch';

class Search extends React.Component {
  state = {
    value: '',
    isLoading: false,
    currentId: null,
  };

  search = debounce(query => {
    if (query.trim !== '') {
      this.setState({ isLoading: true });
      searchArtistsJSON(query).then(
        results => this.setState({ results, isLoading: false }),
        error => console.log(error)
      );
    }
  }, 150);

  handleChange = e => {
    e.persist();
    this.setState({ value: e.target.value });
    this.search(e.target.value);
  };

  render() {
    const { isLoading, currentId, results, value } = this.state;

    return (
      <div className="search">
        <Logo />
        <SearchInput
          placeholder="Search for artists"
          className="input"
          value={value}
          onChange={this.handleChange}
        />

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
          <div className="empty">
            No Results Found. Search for artists.
          </div>
        )}
      </div>
    );
  }
}

export function SearchInput(props) {
  return (
    <div style={{ position: 'relative' }}>
      <IconSearch
        style={{
          position: 'absolute',
          height: 16,
          width: 16,
          top: 12,
          left: 10,
        }}
      />
      <input {...props} style={{ paddingLeft: 36 }} />
    </div>
  );
}

export default Search;
