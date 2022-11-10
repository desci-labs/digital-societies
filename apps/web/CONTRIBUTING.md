# Contributing

Thank you for your interest in contributing to the Desoc interface! 🔌

# Development

Before running anything, you'll need to install the dependencies:

```
cd apps/web
yarn install
```

## Running the interface locally

```
yarn dev
```

The interface should automatically open. If it does not, navigate to [http://localhost:3000].

## Creating a production build

```
yarn build
```

To serve the production build:

```
yarn start
```

Then, navigate to [http://localhost:3000] to see it.

## Running unit tests

```
yarn test
```

By default, this runs only unit tests that have been affected since the last commit. To run _all_ unit tests:

```
yarn test --watchAll
```

## Running integration tests (cypress)

Integration tests require a server to be running. In order to see your changes quickly, run `start` in its own tab/window:

```
yarn start
```

Integration tests are run using `cypress`. When developing locally, use `cypress:open` for an interactive UI, and to inspect the rendered page:

```
yarn cypress:open
```

To run _all_ cypress integration tests _from the command line_:

```
yarn cypress:run
```

## Engineering standards

Code merged into the `main` branch of this repository should adhere to high standards of correctness and maintainability.
Use your best judgment when applying these standards. If code is in the critical path, will be frequently visited, or
makes large architectural changes, consider following all the standards.

- Have at least one engineer approve of large code refactorings
- At least manually test small code changes, prefer automated tests
- Thoroughly unit test when code is not obviously correct
- If something breaks, add automated tests so it doesn't break again
- Add integration tests for new pages or flows
- Verify that all CI checks pass before merging

## Guidelines

The following points should help guide your development:

- Security: the interface is safe to use
  - Avoid adding unnecessary dependencies due to [supply chain risk](https://github.com/LavaMoat/lavamoat#further-reading-on-software-supplychain-security)
- Reproducibility: anyone can build the interface
  - Avoid adding steps to the development/build processes
  - The build must be deterministic, i.e. a particular commit hash always produces the same build
- Decentralization: anyone can run the interface
  - All other external dependencies should only enhance the UX ([graceful degradation](https://developer.mozilla.org/en-US/docs/Glossary/Graceful_degradation))
- Accessibility: anyone can use the interface
  - The interface should be responsive, small and also run well on low performance devices (majority of swaps on mobile!)

## Release process

There is no production release for now. Every major updates to the staging branch can be previewed and tested here: [Preview 🚀](https://soulbound-git-dev-de-sci-labs.vercel.app/)

Fix pull requests should be merged whenever ready and tested.
If a fix is urgently needed for testing, the vercel workflow will be automatically triggered
after the fix is merged into `dev`.

Features should not be merged into `main` until they are ready for testing.
When building larger features or collaborating with other developers, create a new branch from `dev` to track its development.
We Use the automatic Vercel preview for sharing the feature to collect feedback.  
When the feature is ready for review, create a new pull request from the feature branch into `main` and request reviews from
the appropriate maintainers.

## Finding a first issue

Start with issues with the label
[`good first issue`](https://github.com/desci-labs/soulbound/labels/good%20first%20issue).
