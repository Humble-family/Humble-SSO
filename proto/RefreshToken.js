module.exports = class RefreshToken {
  constructor(id, refreshToken, expiresAt, scope, clientid, userid) {
    this.id = id;
    this.refreshToken = refreshToken;
    this.expiresAt = expiresAt;
    this.scope = scope;
    this.clientid = clientid;
    this.userid = userid;
  }
};