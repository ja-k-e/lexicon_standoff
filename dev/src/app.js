const config = require('config');

console.clear();

import Adapters from './adapters/Adapters';
import Auth from './components/Auth';
import State from './components/State';
import Renderers from './renderers/Renderers';

const //
  AUTH = new Auth(),
  VERSION = 0.2;

console.info(
  `
%cLexicon Standoff v${VERSION}
%c© Jake Albaugh ${new Date().getFullYear()}
https://twitter.com/jake_albaugh
https://github.com/jakealbaugh/lexicon_standoff
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
    authGoogle
  });
  renderer.renderInitial();
  renderer.render();
}

function initializeState(existingUser) {
  Adapters.Users
    .globalFindOrCreate(existingUser)
    .then(({ user }) => {
      let avatar = validAvatar(user);
      Adapters.Users
        .globalUpdate(user.id, { avatar })
        .then(() => {
          Adapters.Users
            .globalFind(user.id)
            .then(user => new State({ user, auth: AUTH }))
            .catch(handleError);
        })
        .catch(handleError);
    })
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
  console.error(error);
}

function validAvatar(user) {
  let def =
    'https://lh3.googleusercontent.com/-XdUIqdMkCWA/AAAAAAAAAAI/AAAAAAAAAAA/4252rscbv5M/photo.jpg';
  if (user.avatar && user.avatar !== def) return user.avatar;
  if (user.image && user.image !== def) return user.image;
  let avatars = Renderers.Launch._avatars,
    name = avatars[Math.floor(Math.random() * avatars.length)];
  return Renderers.Launch._avatarUrl(name);
}
