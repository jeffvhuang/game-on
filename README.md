# Game On

This web app front end allows people to find and see what major tournaments and games are occurring in the sports and/or e-sports worlds.

## Getting Started

This project was made to be run in conjunction with the [backend API](https://github.com/jeffvhuang/game-on-api.git).

### Requirements

- Node.js 12.10.0 and npm 6.10.3
- React 16.8.6
- Redux 4.0.1
- Typescript 3.5.2
- Node-Sass 4.12
- Webpack 4.34
- Ant Design 3.19.3
- Full Calendar 4.2

Please refer to package.json file for further dependencies

### Installation

- Clone the project into a directory: `git clone https://github.com/jeffvhuang/game-on.git`
- Navigate into the project directory: `cd game-on`.
- Install project dependencies: `npm install`
- It may be necessary to rebuild the sass locally: `npm rebuild node-sass`
- Build and run the web app `npm start`. This should automatically open it up in a browser. Otherwise go to it manually at [http://localhost:8080](http://localhost:8080).

## Production

This app is undergoing initial development and is not currently deployed.

### Preview

The following instructions can be used to test an optimized production version.

1. Navigate to the root directory of the project
2. `npm run build` will create a build directory in the root location
3. `npm install -g http-server` to install the http npm package globally
4. `cd build`
5. `http-server`
6. Navigate to http://localhost:8080 in your browser to see the production version running

### Deployment

N/A

## Authors

- **Jeffrey Huang** - Sole author, owner and developer. jeffvh@outlook.com
