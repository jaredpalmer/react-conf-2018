import React from 'react';
import ListItem from './ListItem';
import { fetchArtistListJSON } from '../api';
import { Logo } from './Icon/Logo';
import { unstable_createResource } from 'react-cache';

const ArttistListResource = unstable_createResource(fetchArtistListJSON);

class Search extends React.Component {
  state = {
    // toggles whether to show or hide the inline loading spinner
    // just like native iOS!
    currentId: null,
  };

  render() {
    const results = ArttistListResource.read();
    return (
      <div className="search">
        <Logo />
        {results.length > 0 ? (
          results.map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={this.state.currentId}
            />
          ))
        ) : (
          <div className="empty">Oh no.</div>
        )}
      </div>
    );
  }
}

export default Search;
