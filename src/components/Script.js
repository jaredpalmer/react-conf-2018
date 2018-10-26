import React, { Fragment } from 'react';
import { unstable_createResource as createResource } from 'react-cache';

const ScriptResource = createResource(
  source =>
    new Promise(resolve => {
      const script = document.createElement('script');
      script.src = source;
      script.onload = resolve;
      document.body.appendChild(script);
    })
);

export function Script(props) {
  ScriptResource.read(props.src);
  return <Fragment>{props.children}</Fragment>;
}

Script.displayName = 'Script';
