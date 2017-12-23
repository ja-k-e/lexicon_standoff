const firebaseKeys = require('firebase-keys');

export default class Auth {
  constructor() {
    firebase.initializeApp(firebaseKeys);
  }

  detectExisting() {
    return new Promise((resolve, reject) => {
      firebase.auth().onAuthStateChanged(existingUser => {
        if (existingUser) resolve(existingUser);
        else reject();
      });
    });
  }

  detectRedirectResult() {
    return new Promise((resolve, reject) => {
      firebase.auth().getRedirectResult(result => {
        if (result) resolve(result.user);
        else reject();
      });
    });
  }

  authenticate(type) {
    let provider = new firebase.auth[type]();
    firebase.auth().signInWithRedirect(provider);
  }
}
