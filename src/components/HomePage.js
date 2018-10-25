import React from 'react';

import { Spinner } from './Spinner';
import ListItem from './ListItem';
import { searchArtistsJSON } from '../api';
import { Logo } from './Icon/Logo';
import { IconSearch } from './Icon/IconSearch';

class Search extends React.Component {
  state = {
    value: '',
    isLoading: true,
    currentId: null,
  };

  componentDidMount() {
    searchArtistsJSON().then(
      results => this.setState({ results, isLoading: false }),
      error => console.log(error)
    );
  }

  render() {
    const { isLoading, currentId, results, value } = this.state;

    return (
      <div className="search">
        <Logo />
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
