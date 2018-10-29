# Moving to React Suspense

This is the source code to my talk at React Conf 2018 called "Moving to React Suspense". It is a small slice of Spotify called Suspensify. It's built with create react app, reach router, and good ol' setState. 


- [Watch the full talk on YouTube](https://youtu.be/SCQgE4mTnjU)
- [Download Slides](https://github.com/jaredpalmer/react-conf-2018/raw/master/MovingToReactSuspense.key)
- [Checkout "The Platform"](https://github.com/palmerhq/the-platform)


This repo is a bit gross. node_modules are checked in because I was unsure of the wifi situation and needed to lock in builds from react master while I built this out.

It's separated into 3 folders:

- `before-suspense` is the initial state of the application.
- `conf-talk-progress` is my final state of my talk so you can follow along.
- `after-suspsense` is a version where every single thing that can be moved to suspense, has been moved to suspense. I did not get this far in my talk, but it's there for completeness.

> Note the Ken Wheeler and Wale routes do not work. I didn't bother making fake data for them. Sorry. Only the Drake and Big Sean routes work (first 2 results).



## What's it look like?

![kapture 2018-10-29 at 15 50 42](https://user-images.githubusercontent.com/4060187/47676250-789c0880-db92-11e8-8b67-e6e90f0cd5a2.gif)
