const db = require('../db/database');

module.exports = {

  getAccessToken: function (accessToken) {
    let token = db.getAccessToken(accessToken);
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.expiresAt,
      scope: token.scope,
      client: db.getClient(token.clientid),
      user: db.getUserById(token.userid)
    }
  },

  getRefreshToken: function (refreshToken) {
    let token = db.getRefreshToken(refreshToken);
    return {
      refreshToken: token.accessToken,
      refreshTokenExpiresAt: token.expiresAt,
      scope: token.scope,
      client: db.getClient(token.clientid),
      user: db.getUserById(token.userid)
    }
  },

  getAuthorizationCode: function (authorizationCode) {
    let code = db.getAuthorizationCode(authorizationCode);
    return {
      code: code.code,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      client: db.getClient(code.clientid),
      user: db.getUserById(code.userid)
    }
  },

  getClient: function (clientId, clientSecret) {
    let client = db.getClient(clientId, clientSecret);
    return {
      id: client.id,
      redirectUris: client.redirectUris,
      grants: client.grants
    }
  },

  getUser: function (username, password) {
    return db.getUserByCredentials(username, password);
  },

  getUserFromClient: function (client) {
    return db.getUserById(client.userid);
  },

  saveToken: function (token, client, user) {
    let access = db.saveAccessToken({ accessToken: token.accessToken, expiresAt: token.accessTokenExpiresAt, scope: token.scope, clientid: client.id, userid: user.id });
    let refresh = db.saveRefreshToken({ refreshToken: token.refreshToken, expiresAt: token.refreshTokenExpiresAt, scope: token.scope, clientid: client.id, user: user.id });
    if (!access || !refresh) {
      return {
        accessToken: access.accessToken,
        accessTokenExpiresAt: access.expiresAt,
        refreshToken: refresh.refreshToken,
        refreshTokenExpiresAt: refresh.expiresAt,
        scope: access.scope,
        client: db.getClient(access.clientid),
        user: db.getUserById(access.userid)
      }
    } else {
      return false;
    }
  },

  saveAuthorizationCode: function (code, client, user) {
    let authCode = db.saveAuthorizationCode({ code: code.authorizationCode, expiresAt: code.expiresAt, redirectUri: code.redirectUri, scope: code.scope, clientid: client.id, userid: user.id });
    if (authCode) {
      return { authorizationCode: authCode.code, expiresAt: authCode.expiresAt, redirectUri: authCode.redirectUri, scope: authCode.scope, client: db.getClient(authCode.clientid), user: db.getUserById(authCode.userid) }
    } else {
      return false;
    }
  },

  revokeToken(token){
    return !!db.deleteRefreshToken(token.refreshToken);
  },

  revokeAuthorizationCode(code){
    return !!db.deleteAuthorizationCode(code.code);
  }
};
