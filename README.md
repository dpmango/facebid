## Facebid front-end
React.js app bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app).

React, Redux, React-router 4, React-loadable is used

### Demo link
http://facebid.surge.sh

## Table of Contents
- [How to start](#hot-to-start)
- [Back-end](#back-end)
- [Test Authentication](#test-authentication)
- [Folder structure](#folder-structure)
- [Gulp](#gulp)
- [Important notes](#important-notes)

## How to start
* `yarn start` - run gulp, react scripts, json-server and social-server
* `yarn build` - run gulp in production mode and react scripts build folder
* `yarn deploy-all` - deploy to surge, heroku json-server and social-server
* `yarn postbuild` - run react-snap (prebuild command to be run authomatically)

## Back-end
While backed is under development. Fake API responces located at `/src/db.json` and server through [json-server](https://github.com/typicode/json-server). For the surge "production-like" it's located on `http://facebid-api.herokuapp.com` with uptime robot for 100% uptime and should be deployed with `yarn deploy-json-server` command (subtree push)

You should have instaled [hotel](https://github.com/typicode/hotel) and `json-server` globally (`npm i -g json-server`)

Social OAuth server for authentication is located under `social-api` and to be deployed with `yarn deploy-social-server`
Please request `.env` file with secret keys

### Test Authentication
For the development purposes, please use the login `test@mail.com` and `123456` as a password to process for login form

## Folder structure
```
src/
  components - componenets, page based
  pages - entry points for routes
  reducers - redux reducers
  services - common functionality and helper functions
  store - redux store logic
```

## Gulp
Gulp is responsible for sass to css compilation and building sprites. Tasks are taken from [Gulp Starter Pack](http://github.com/dpmango/gulp-starter-pack).

Task name          | Description                                                      
:------------------|:----------------------------------
`default`          | will start all tasks required by project in dev mode: initial build, watch files (same as `build:development`)
`build`            | build production-ready project (with code optimizations)
`sass` 	           | compile .sass/.scss to .css. Included [postcss](https://github.com/postcss/postcss) for [autoprefixer](https://github.com/postcss/autoprefixer), flexbugs and other cool [plugins](https://github.com/postcss/postcss#plugins) you might add
`sprite:svg`       | create svg symbol sprites
`sprite:png`       | create png sprites

All available tasks are placed in a folder `./gulp/tasks` as separate **.js** files.

## Important notes
- Add `NODE_PATH=./src` to `.env` file to support relative imports (won't start without that)
- Redux store save state in localStorage. When data structure chages, please update `version` variable in `src/store/localStorage.js` to clear localStorage on user side.
- Site is running under HTTPS as well as fake backends. If you have an issues setting up local environment, please user [This guide]( https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec)
