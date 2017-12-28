# Lexicon Standoff
A real-time party vocabulary game full of deceit and wit.

This is a single page static client application.

## Firebase
This app uses a Firebase real-time db to handle all of its backend storage. You'll need a Firebase account and app to make any of this work.

This app uses Google, Facebook, and Twitter Authentication through Firebase. In order to do that, you'll need a Facebook and Twitter app set up properly and have all three methods enabled in Firebase. [Firebase Documentation](https://firebase.google.com/docs/auth/web/start).

Once your Firebase app is set up, add your Firebase initialization settings to `config/firebase-keys.js`.

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
- I am using Netlify to serve the `/prod` directory for free.
