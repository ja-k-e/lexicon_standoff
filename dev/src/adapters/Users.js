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
        .ref(this.r(params.id))
        .set(params)
        .then(resolve)
        .catch(reject);
    });
  }

  globalDelete(id) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(id))
        .set(null)
        .then(resolve)
        .catch(reject);
    });
  }

  globalFind(userId) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(userId))
        .once('value')
        .then(snap => {
          let value = snap.val();
          if (value !== null) resolve(value);
          else reject();
        })
        .catch(reject);
    });
  }

  globalUpdate(userId, params) {
    return new Promise((resolve, reject) => {
      this.db
        .ref(this.r(userId))
        .update(params)
        .then(resolve)
        .catch(reject);
    });
  }

  // Private

  get _key() {
    return 'users';
  }

  _userDataFromParams(params) {
    let id = params.uid,
      image = params.photoURL,
      avatar = image,
      name = params.displayName.replace(/ .+$/, '').substring(0, 12);
    return { id, avatar, image, name };
  }
}
