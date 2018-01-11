import Adapter from './Adapter';

export default class Users extends Adapter {
  // Global Actions

  globalFindOrCreate(params) {
    return new Promise((resolve, reject) => {
      let data = this._userDataFromParams(params);
      this.globalFind(data.id)
        .then(user => {
          resolve({ user });
        })
        .catch(() => {
          this.globalCreate(data)
            .then(() => {
              this.globalFind(data.id)
                .then(user => {
                  resolve({ user });
                })
                .catch(reject);
            })
            .catch(reject);
        });
    });
  }

  globalCreate(params) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('users')
        .doc(params.id)
        .set(params)
        .then(resolve)
        .catch(reject);
    });
  }

  globalDelete(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('users')
        .doc(id)
        .delete()
        .then(resolve)
        .catch(reject);
    });
  }

  globalFind(id) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('users')
        .doc(id)
        .get()
        .then(doc => {
          if (doc.exists) resolve(doc.data());
          else reject();
        })
        .catch(reject);
    });
  }

  globalUpdate(id, params) {
    return new Promise((resolve, reject) => {
      this.db
        .collection('app')
        .doc(this.root)
        .collection('users')
        .doc(id)
        .update(params)
        .then(resolve)
        .catch(reject);
    });
  }

  // Private

  _userDataFromParams(params) {
    let id = params.uid,
      image = params.photoURL,
      avatar = image,
      name = this._safeName(params.displayName);
    return { id, avatar, image, name };
  }

  _safeName(name) {
    if (name) return name.replace(/ .+$/, '').substring(0, 12);
    return this._names[Math.floor(Math.random() * this._names.length)];
  }

  get _names() {
    return [
      'Angsty',
      'Babe',
      'Baby',
      'BFF',
      'Birdie',
      'Booger',
      'Captain',
      'Cuddles',
      'Darling',
      'Doll',
      'Fighter',
      'Goober',
      'Heisenberg',
      'Honey',
      'Hot Lips',
      'Hunk',
      'Jello',
      'King',
      'Lover',
      'Mama',
      'Muffin',
      'Muppet',
      'Papi',
      'Peanut',
      'Pookie',
      'Pop Tart',
      'Punk',
      'Queen',
      'Sailor',
      'Shorty',
      'Simba',
      'Soldier',
      'Sport',
      'Sugar',
      'Superstar',
      'Tiger',
      'Tinkerbell'
    ];
  }
}
