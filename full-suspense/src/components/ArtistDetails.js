import React from 'react';
import { fetchArtistJSON } from '../api';
import { unstable_createResource } from 'react-cache';

export const ImageResource = unstable_createResource(
  source =>
    new Promise(resolve => {
      const img = new Image();
      img.src = source;
      img.onload = resolve;
    })
);

const Img = ({ src, alt, ...props }) => {
  ImageResource.read(src);
  return <img src={src} alt={alt} {...props} />;
};

// I didn't get this far in the talk,
// but it's the same as the rest of the sections...
const ArtistResource = unstable_createResource(fetchArtistJSON);

class ArtistDetails extends React.Component {
  render() {
    return <ArtistHeader artist={ArtistResource.read(this.props.id)} />;
  }
}

function ArtistHeader({ artist }) {
  return (
    <div className="heading">
      <React.Suspense
        maxDuration={500}
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

// I also didn't get to show this. This uses Suspense to load
// a dummy script. The key use case being something like Stripe.js
// which must always be loaded through a script tag. We can
// use suspense to pause the "Buy Tickets" button from
// rendering until fakeStripe.js has loaded
//
// import { Script } from 'the-platform'
//
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
//          <React.Suspense fallback={<Spinner />}>
//           <Script src="/fakestripe.js?delay=5000">
//              <button onClick={this.handleClick}>Buy Tickets</button>
//           </Script>
//          </React.Suspense>
//         </div>
//       </div>
//     ) : null;
//   }
// }
