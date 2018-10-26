import React, { Suspense, Fragment } from 'react';
import { Spinner } from './Spinner';
import { fetchArtistJSON } from '../api';
import { Img, SuperImage } from './Img';
import { Script } from './Script';
import { unstable_createResource as createResource } from 'react-cache';

const ArtistDetailsResource = createResource(fetchArtistJSON);

class ArtistDetails extends React.Component {
  render() {
    const artist = ArtistDetailsResource.read(this.props.id);
    return (
      <Fragment>
        <ArtistHeader artist={artist} />
        <ArtistConcerts artist={artist} />
      </Fragment>
    );
  }
}

function ArtistHeader({ artist }) {
  return (
    <div className="heading row">
      <SuperImage className="artwork" images={artist.images} />
      <div>
        <h1>{artist.name}</h1>
        <div className="meta">
          {artist.followers.total.toLocaleString()} followers
        </div>
      </div>
    </div>
  );
}

class ArtistConcerts extends React.Component {
  handleClick = () => {
    window.FakeStripe.charge();
  };

  render() {
    const { concert } = this.props.artist;
    return concert ? (
      <div className="artist-concerts">
        <h3>Next Concert</h3>

        <div className="row ">
          <div>
            <h4>{concert.venue}</h4>
            <div>
              {concert.cityState}, {concert.date}
            </div>
          </div>
          <Suspense maxDuration={500} fallback={<Spinner />}>
            <Script src="/fakestripe.js?delay=5000">
              <button onClick={this.handleClick}>Buy Tickets</button>
            </Script>
          </Suspense>
        </div>
      </div>
    ) : null;
  }
}

export default ArtistDetails;
