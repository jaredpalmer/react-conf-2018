import React from 'react';
import { Link } from '@reach/router';
import { Spinner } from './Spinner';
import IconPerson from './Icon/IconPerson';

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
        {item.images &&
        item.images.length > 0 &&
        item.images[0] &&
        item.images[0].url ? (
          <img className="artwork" src={item.images[0].url} alt={item.name} />
        ) : (
          <IconPerson className="artwork" />
        )}
        <div className="col flex-1">
          <div className="name">{item.name}</div>
          <div className="meta">{item.type.toUpperCase()}</div>
        </div>
        <div>{currentId === item.id ? <Spinner /> : null}</div>
      </div>
    </Link>
  );
}

export default ListItem;
