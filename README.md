# Load Monitor

## Requirements

- Node.js – Tested on the current LTS release, ~4.4.0 as of writing this.

## Installation

Run:

```
npm install
```

Webpack should automatically build the assets after npm finishes installing. If for any reason it doesn't, you can also manually run:

```
npm run dist
```

## Running the App

To run the "production" version with the pre-built assets, simply use:

```
npm start
```

To run the development environment with hot reloading, etc., use:

```
npm run dev
```

With either option, the app will be available at: [http://localhost:3000](http://localhost:3000)

## Testing

The tests are located in `src/__tests__`. To run the tests, use:

```
npm test
```
