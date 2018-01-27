const firebaseKeys = require('firebase-settings');
const config = require('config');
const redirect =
  config.env === 'development'
    ? 'http://localhost:8000'
    : 'https://lexiconstandoff.com';

export default class Auth {
  constructor() {
    this.db = firebase.firestore(firebase.initializeApp(firebaseKeys));
  }

  signOut() {
    return new Promise((resolve, reject) => {
      firebase
        .auth()
        .signOut()
        .then(resolve)
        .catch(reject);
    });
  }

  detectExisting() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(existingUser => {
        if (existingUser) resolve(existingUser);
        else reject();
      });
    });
  }

  loadUI() {
    let ui = new firebaseui.auth.AuthUI(firebase.auth());
    ui.start('.firebaseui-auth', {
      signInSuccessUrl: redirect,
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.TwitterAuthProvider.PROVIDER_ID,
        firebase.auth.PhoneAuthProvider.PROVIDER_ID
      ],
      tosUrl: '/toc'
    });
  }
}
