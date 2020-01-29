module.exports = class Link {
  constructor(id, serviceid, userid, scopes, refreshToken, username) {
    this.id = id;
    this.serviceid = serviceid;
    this.userid = userid;
    this.scopes = scopes;
    this.refreshToken = refreshToken;
    this.username = username;
  }
}