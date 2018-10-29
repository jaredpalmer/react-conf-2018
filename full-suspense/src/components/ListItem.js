import React from 'react';
import { Link } from '@reach/router';
import { Spinner } from './Spinner';
import { Img } from 'the-platform';

function ListItem({ item, to, onClick, currentId }) {
  return (
    <Link
      to={to}
      className="name"
      onClick={() => {
        if (onClick) {
          onClick(item.id);
        }
      }}
    >
      <div className="item" key={item.id}>
        {/* Instead of placing fallback here, better to wait for all the images to be ready */}
        <React.Suspense
          maxDuration={1000}
          fallback={
            <img
              className="artwork preview"
              src={`/img/${item.id}/avatar.jpeg`}
              alt={item.name}
            />
          }
        >
          <Img
            className="artwork loaded"
            src={`/img/${item.id}/avatar-hd.jpeg`}
            alt={item.name}
          />
        </React.Suspense>
        <div className="col flex-1">
          <div className="name">{item.name}</div>
        </div>
        <div>{currentId === item.id ? <Spinner /> : null}</div>
      </div>
    </Link>
  );
}

export default ListItem;
