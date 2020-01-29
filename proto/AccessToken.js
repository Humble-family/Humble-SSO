module.exports = class AccessToken {
  constructor(id, accessToken, expiresAt, scope, clientid, userid) {
    this.id = id;
    this.accessToken = accessToken;
    this.expiresAt = expiresAt;
    this.scope = scope;
    this.clientid = clientid;
    this.userid = userid;
  }
};