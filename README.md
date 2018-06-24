# McReact

_A low-budget UI library that implements some core ideas from React 15, including ReactDOM and the Stack Reconciler_

View at http://ecstatic-kowalevski-0e45dd.netlify.com

## Why do this?

While abstractions are a good thing, it's always a good idea to have a general understanding the internals of the stack immediately below where you're working. In the case of React apps, this includes React (and perhaps things like Redux). This repo is my attempt to understand the internals by building a simplified version of the library. This is 100% educational and not intended for an actual projects

## What does this do?

- Performs initial render of a single component
- Implements the classic React lifecycle hooks, excepting componentDidUpdate
- Performs a limited update of the component, including:
  - Updating text inside of DOM nodes
  - Updating props passed to components

## What does this not do?

- JSX
- Unmounting and remounting of components
- Rendering of component hierarchies
- Event Handling of any kind
- Inline styling or CSS-in-JS support of any kind
- No concept of transactions, so re-renders clobber state controlled by the DOM (e.g. form inputs)

## Related Reading on React Internals

- http://www.mattgreer.org/articles/react-internals-part-one-basic-rendering/
- https://github.com/Bogdan-Lyashenko/Under-the-hood-ReactJS
- https://github.com/acdlite/react-fiber-architecture

## Similar Projects

- Build your own React Renderer - https://github.com/nitin42/Making-a-custom-React-renderer
- Reimplement Redux - https://toddmotto.com/redux-typescript-store
