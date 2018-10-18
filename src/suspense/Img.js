import React from 'react';
import { createResource } from 'react-cache';
import { cache } from '../cache';

export const ImgResource = createResource(
  ({ src }) => {
    const image = new Image();

    return new Promise((resolve, reject) => {
      image.onload = resolve;
      image.onerror = reject;
      image.src = src;
    });
  },
  ({ src }) => src
);

export const Img = props => {
  ImgResource.read(cache, props);

  return <img {...props} alt="yolo" />;
};
