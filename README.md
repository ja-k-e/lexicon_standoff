# Lexicon Standoff
A real-time party vocabulary game full of deceit and wit.

This is a single page static client application.

## Firebase
This app uses a Firebase real-time db. You'll need a Firebase app to make any of this work. It also uses Google and Twitter Authentication through Firebase. In order to do that, you'll need a Twitter app set up properly and have both methods enabled in your Firebase console. [Firebase Documentation](https://firebase.google.com/docs/auth/web/start).

Once your Firebase app is set up, add your Firebase initialization settings to `config/firebase-settings.js`.

```js
module.exports = {
  apiKey: 'GET-FROM-FIREBASE',
  authDomain: 'YOUR-APP.firebaseapp.com',
  databaseURL: 'https://YOUR-APP.firebaseio.com',
  projectId: 'YOUR-APP',
  storageBucket: '',
  messagingSenderId: 'GET-FROM-FIREBASE'
};
```

## Development
- `npm install`
- `gulp`
- [localhost:8000](http://localhost:8000)

## Deployment
- `gulp publish`
- Commit `/prod` changes and push to origin
- I am using Netlify to serve the `/prod` directory for free. You could also use GitHub pages.
