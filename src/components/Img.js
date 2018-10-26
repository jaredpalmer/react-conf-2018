import React, { Suspense } from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const ImageResource = createResource(
  source =>
    new Promise(resolve => {
      const img = new Image();
      img.src = source;
      img.onload = resolve;
    })
);

export function Img({ src, alt, ...props }) {
  ImageResource.read(src);
  return <img src={src} alt={alt} {...props} />;
}

export function SuperImage({ images, alt, className = '', ...props }) {
  return (
    <Suspense
      maxDuration={1000}
      fallback={
        <img
          alt={alt}
          src={images[2].url}
          className={['image--preview', className].join(' ')}
          {...props}
        />
      }
    >
      <Img
        alt={alt}
        src={images[0].url}
        className={['image--loaded', className].join(' ')}
        {...props}
      />
    </Suspense>
  );
}

Img.displayName = 'Img';
