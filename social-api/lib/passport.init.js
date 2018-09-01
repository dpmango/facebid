const passport = require('passport')
const { Strategy: TwitterStrategy } = require('passport-twitter')
const { Strategy: FacebookStrategy } = require('passport-facebook')
const {
  TWITTER_CONFIG, FACEBOOK_CONFIG
} = require('../config')

module.exports = () => {

  // Allowing passport to serialize and deserialize users into sessions
  passport.serializeUser((user, cb) => cb(null, user))
  passport.deserializeUser((obj, cb) => cb(null, obj))

  // The function that is called when an OAuth provider sends back user
  // Information.  Normally, you would save the user to the database
  // in this callback.
  const callback = (accessToken, refreshToken, profile, cb) => cb(null, profile)

  // Adding each OAuth provider's strategy to passport
  passport.use(new TwitterStrategy(TWITTER_CONFIG, callback))
  passport.use(new FacebookStrategy(FACEBOOK_CONFIG, callback))
}
