# Moving to React Suspense

By [Jared Palmer](https://twitter.com/jaredpalmer) at [React Conf 2018](https://conf.reactjs.org).

---


This is the source code to the application I demo'd at React Conf 2018. It is a small slice of Spotify called Suspensify. It's built with create react app, reach router, and good ol' setState. 


- [Watch the full talk on YouTube](https://youtu.be/SCQgE4mTnjU)
- [Download Slides](https://github.com/jaredpalmer/react-conf-2018/raw/master/MovingToReactSuspense.key)
- [Checkout "The Platform"](https://github.com/palmerhq/the-platform)

It's separated into 3 folders:

- `before-suspense` is the initial state of the application.
- `conf-talk-progress` is where we end up--the final state of my talk--so you can follow along.
- `after-suspsense` is a version where every single thing that can be moved to suspense, has been moved to suspense. I did not get this far in my talk, but it's there for completeness / reference.

## Running locally

```
cd conf-talk-progress
yarn start
```

> Note the Ken Wheeler and Wale routes do not work. I didn't bother making fake data for them. Sorry. Only the Drake and Big Sean routes work (first 2 results).

### A few notable tweaks to standard Create React App

In the `patches` directory, there is a patched version of CRA's `config/webpackDevServer.config.js` that adds a little express middleware that will delay the high-res images from loading for demo purposes. It sniffs any requests including with `-hd.jpeg` and waits for value of `delay` query parameter. The widget's request latency slider is used to set this value for all images.


## What's it look like?

![kapture 2018-10-29 at 15 50 42](https://user-images.githubusercontent.com/4060187/47676250-789c0880-db92-11e8-8b67-e6e90f0cd5a2.gif)
