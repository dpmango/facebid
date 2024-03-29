# React Social Authentication Server

## Medium posts that detail this repo
* [Twitter, Google, Facebook, Github version on Codeburst](https://medium.com/p/862d59583105)

## Getting Started

#### Because of Facebook, https is required. Even in development.
Facebook requires all apps interacting with their api (including those in development) to be served over https.  This means you will need to run create-react-app in https mode. Plus set up certificates for your server. Go ahead and get yourself a cup of coffee. This could take a minute.

To add https to localhost [follow these instructions](https://medium.freecodecamp.org/how-to-get-https-working-on-your-local-development-environment-in-5-minutes-7af615770eec) (OS X).

You will also need to manually add the https certificate to Chrome as [described here](https://www.comodo.com/support/products/authentication_certs/setup/mac_chrome.php).

I also had to open a seperate tab for https://localhost:8080 and accept the security warning before the client would push requests through.

If you only want to use Twitter authentication (https is not required), follow the instructions in [this branch](https://github.com/funador/react-auth-client/tree/twitter-auth)

## Setting up your .env file
```
touch .env
// open .env and add values for: TWITTER_KEY, TWITTER_SECRET, GOOGLE_KEY,
// GOOGLE_SECRET, FACEBOOK_KEY, FACEBOOK_SECRET, GITHUB_KEY, GITHUB_SECRET
// SESSION_SECRET
// You get the keys and secret from registering at the appropriate
// provider (ie. Twitter, Google, Facebook, Github)
// Make sure you have added 'https://127.0.0.1:8080/_insert_provider_here/callback'
// in your callback settings for each provider
npm run dev
```

#### Deploy
Everything is set up to deploy to Heroku, you just need to plug in the environment variables for the providers.
ps://github.com/funador/react-auth-server/issues)
