const bcrypt = require('bcryptjs');

module.exports = class User {
  constructor(id, username, avatar, isAdmin, mail, humblemail, apps, twofa, password) {
    this.id = id;
    this.username = username;
    this.avatar = avatar;
    this.isAdmin = isAdmin;
    this.mail = mail;
    this.humblemail = humblemail;
    this.apps = apps;
    this.twofa = twofa;
    this.password = password;
  }
  format = () => {
    this.password = undefined;
    this.apps = JSON.parse(this.apps);
    return this;
  }
  generateHumblemail = () => {
    
  }
  activateTwofa = () => {
    this.twofa = true;
  }
  deactivateTwofa = () => {
    this.twofa = false;
  }
  cryptPassword = () => {
    return new Promise((resolve, reject) => {
      bcrypt.hash(this.password, 10).then(hash => {
        this.password = hash;
        return resolve(this);
      }).catch(err => {
        console.error('Error when crypting password (User.cryptPassword)', err);
        return reject(err);
      });
    });
  }
  comparePassword = textPassword => {
    return new Promise((resolve, reject) => {
      bcrypt.compare(textPassword, this.password).then(res => {
        resolve(res);
      }).catch(err => {
        console.error('Error when comparing password (User.comparePassword)', err);
        reject(err);
      });
    });
  }
}