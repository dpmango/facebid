const express = require('express')
const router = express.Router()
const passport = require('passport')
const authController = require('./auth.controller')

// Setting up the passport middleware for each of the OAuth providers
const twitterAuth = passport.authenticate('twitter')
const facebookAuth = passport.authenticate('facebook')

// This custom middle ware allows us to attach the socket id to the session
// With that socket id we can send back the right user info to the right
// socket
const addSocketIdtoSession = (req, res, next) => {
  req.session.socketId = req.query.socketId
  next()
}

// Routes that are triggered on the client
router.get('/twitter', addSocketIdtoSession, twitterAuth)
router.get('/facebook', addSocketIdtoSession, facebookAuth)

// Routes that are triggered by the callbacks from each OAuth provider once
// the user has authenticated successfully
router.get('/twitter/callback', twitterAuth, authController.twitter)
router.get('/facebook/callback', facebookAuth, authController.facebook)

module.exports = router
