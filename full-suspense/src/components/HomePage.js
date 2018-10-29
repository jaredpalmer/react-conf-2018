import React from 'react';
import ListItem from './ListItem';
import { fetchArtistListJSON } from '../api';
import { Logo } from './Icon/Logo';
import { unstable_createResource } from 'react-cache';
import { Spinner } from './Spinner';

const ArttistListResource = unstable_createResource(fetchArtistListJSON);

class Search extends React.Component {
  state = {
    // toggles whether to show or hide the inline loading spinner
    // just like native iOS!
    currentId: null,
  };

  render() {
    return (
      <div className="search">
        <Logo />
        <React.Suspense maxDuration={1000} fallback={<Spinner size="large" />}>
          {ArttistListResource.read().map(item => (
            <ListItem
              to={`/artist/${item.id}`}
              onClick={currentId => this.setState({ currentId })}
              key={item.id}
              item={item}
              currentId={this.state.currentId}
            />
          ))}
        </React.Suspense>
      </div>
    );
  }
}

export default Search;
