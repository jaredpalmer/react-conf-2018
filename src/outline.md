- for the past year React team has been working hard on concurrent React
- in this talk we're going to walk through adding suspense to an existing application.
- Our example app Walk through
  - You can view some artists
  - You can view details
  - you can play music
  - You can fake buying tickets
- how the app is built
- To make sure the app loads as fast as possible, optimize for initial loads
- DEFER non-critical resources with currently available methods
- code split
- data
- assets
- UX issues
- Suspense is a react component that allows us to pause react rendering. We can use this prioritize the important parts of our application, defer non-critical resources, and avoiding unecessary placeholders.

---

- StrictMode
- Fix warning
- createRoot
- Wrap router with Suspense and spinner fallback
- Swap out for React.lazy

---

react-cache

- react-cache a basic cache for React applications.
- You use it by creating cache resources which let you access asynchronous data as if it were synchronous, but without changing the way you write components.
- react-cache is very experimental, and using it for JSON is highly experimental so like let's definitely do it right now.
- in practice you will not do this. you'll use an abstraction built on react-cache.

--
