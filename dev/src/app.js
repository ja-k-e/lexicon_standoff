const config = require('config'),
  globals = require('globals');

console.clear();

import Adapters from './adapters/Adapters';
import Auth from './components/Auth';
import State from './components/State';
import Renderers from './renderers/Renderers';

const //
  AUTH = new Auth(),
  VERSION = 0.1;
var NEW_VERSION = false;

console.info(
  `
%cLexicon Standoff v${VERSION}
%c© Jake Albaugh ${new Date().getFullYear()}
https://twitter.com/jake_albaugh
https://github.com/jakealbaugh/lexicon_standoff
Compiled ${globals.compiledAt} CST
 `,
  'font-family: sans-serif; font-weight: bold;',
  'font-family: sans-serif; font-weight: normal;'
);

AUTH.detectExisting()
  .then(initializeUser)
  .catch(() => {
    AUTH.detectRedirectResult()
      .then(initializeUser)
      .catch(handleNoUser);
  });

function authFacebook() {
  AUTH.authenticate('FacebookAuthProvider');
}

function authGoogle() {
  AUTH.authenticate('GoogleAuthProvider');
}

function authTwitter() {
  AUTH.authenticate('TwitterAuthProvider');
}

function handleNewVersion() {
  let renderer = new Renderers.NewVersion(null, {});
  renderer.renderInitial();
  renderer.render();
}

function handleNoUser() {
  let renderer = new Renderers.Auth(null, {
    authTwitter,
    authFacebook,
    authGoogle
  });
  renderer.renderInitial();
  renderer.render();
}

function initializeState(existingUser) {
  Adapters.Users
    .globalFindOrCreate(existingUser)
    .then(({ user }) => new State({ user }))
    .catch(handleError);
}

function initializeUser(existingUser) {
  Adapters.App
    .findVersion()
    .then(version => {
      if (version === VERSION) initializeState(existingUser);
      else if (version < VERSION || !version)
        Adapters.App
          .updateVersion(VERSION)
          .then(() => {
            initializeState(existingUser);
          })
          .catch(handleError);
      else handleNewVersion();
    })
    .catch(handleError);
}

function handleError(error) {
  alert(error);
}
