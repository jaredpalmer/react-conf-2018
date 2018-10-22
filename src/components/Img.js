import React from 'react';
import { createResource } from 'react-cache';
import { cache } from '../cache';

export const ImgResource = createResource(src => {
  return new Promise(resolve => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.src = src;
  });
});

export default function Img({ src, alt, ...props }) {
  ImgResource.read(cache, src);
  return <img alt={alt} src={src} {...props} />;
}
