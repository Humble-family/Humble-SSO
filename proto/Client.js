class Client {
  constructor(id, redirectUris, grants, secret, userid) {
    this.id = id;
    this.redirectUris = redirectUris;
    this.grants = grants;
    this.secret = secret;
    this.userid = userid;
  }
};

module.exports = {Client};