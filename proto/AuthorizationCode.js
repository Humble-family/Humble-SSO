class AuthorizationCode {
  constructor(id, code, expiresAt, redirectUri, scope, clientid, userid) {
    this.id = id;
    this.code = code;
    this.expiresAt = expiresAt;
    this.redirectUri = redirectUri;
    this.scope = scope;
    this.clientid = clientid;
    this.userid = userid;
  }
}

module.exports = {AuthorizationCode};