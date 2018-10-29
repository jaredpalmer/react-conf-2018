import React from 'react';
import { fetchArtistJSON } from '../api';
import { unstable_createResource } from 'react-cache';
import { Img } from 'the-platform';

const ArtistResource = unstable_createResource(fetchArtistJSON);

function ArtistDetails({ id }) {
  const artist = ArtistResource.read(id);
  return (
    <div className="heading">
      <React.Suspense
        fallback={
          <img
            className="artist-image preview"
            src={artist.images[2].url}
            alt={artist.name}
          />
        }
      >
        <Img
          className="artist-image loaded"
          src={artist.images[0].url}
          alt={artist.name}
        />
      </React.Suspense>
      <div>
        <h1>{artist.name}</h1>
        <div className="meta">
          {artist.followers.total.toLocaleString()} followers
        </div>
      </div>
    </div>
  );
}

export default ArtistDetails;

// class ArtistConcerts extends React.Component {
//   handleClick = () => {
//     window.FakeStripe.charge();
//   };

//   render() {
//     const { concert } = this.props.artist;
//     return concert ? (
//       <div className="artist-concerts">
//         <h3>Next Concert</h3>
//         <div className="row ">
//           <div>
//             <h4>{concert.venue}</h4>
//             <div>
//               {concert.cityState}, {concert.date}
//             </div>
//           </div>
//           <button onClick={this.handleClick}>Buy Tickets</button>
//         </div>
//       </div>
//     ) : null;
//   }
// }
