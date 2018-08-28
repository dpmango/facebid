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
* `yarn start` - run gulp and react scripts start
* `yarn build` - run gulp in production mode and react scripts build folder
* `yarn surge` - deploy to surge
* `yarn postbuild` - run react-snap (prebuild command to be run authomatically)

## Back-end
Backed is under development. Fake API responces located at `/src/db.json` and server through [json-server](https://github.com/typicode/json-server). For the surge "production-like" it's located on `http://facebid-api.herokuapp.com` with uptime robot for 100% uptime and should be deployed with `yarn deploy-backend` command (subtree push)

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
- Redux store save state in localStorage. When data structure chages, please update `version` variable in `src/store/localStorage.js` to clear localStorage on user side.
