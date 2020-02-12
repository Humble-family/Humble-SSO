/**
 * Model for the OAuth2-server library.
 * @author Vincent Audergon
 */
const db = require('../database/database');

module.exports = {

  /**
   * Invoked to retrieve an existing access token previously saved through saveToken()
   * @param {String} accessToken the Access Token 
   */
  getAccessToken: function (accessToken) {
    let token = {};
    let client = {};
    let user = {};
    try {
      token = db.getAccessToken(accessToken);
      client = db.getClient(token.cliendid);
      user = db.getUser(token.userid);
    } catch (err) {
      err.log();
    }
    return {
      accessToken: token.accessToken,
      accessTokenExpiresAt: token.expiresAt,
      scope: token.scope,
      client,
      user
    }
  },

  /**
   * Invoked to retrieve an existing refresh token previously saved through saveToken()
   * @param {String} refreshToken the refresh token
   */
  getRefreshToken: function (refreshToken) {
    let token = {};
    let client = {};
    let user = {};
    try {
      db.getRefreshToken(refreshToken);
      client = db.getClient(token.cliendid);
      user = db.getUser(token.userid);
    } catch (err) {
      err.log();
    }
    return {
      refreshToken: token.accessToken,
      refreshTokenExpiresAt: token.expiresAt,
      scope: token.scope,
      client,
      user
    }
  },

  /**
   * Invoked to retrieve an existing authorization code previously saved through saveAuthorizationCode()
   * @param {String} authorizationCode the authorization code
   */
  getAuthorizationCode: function (authorizationCode) {
    let code = {};
    let client = {};
    let user = {};
    try {
      code = db.getAuthorizationCode(authorizationCode);
      client = db.getClient(code.clientid);
      user = db.getUserById(code.userid);
    } catch (err) {
      err.log();
    }
    return {
      code: code.code,
      expiresAt: code.expiresAt,
      redirectUri: code.redirectUri,
      scope: code.scope,
      client,
      user
    }
  },

  /**
   * Invoked to retrieve a client using a client id or a client id/client secret combination, depending on the grant type.
   * @param {String} clientId the client id
   * @param {String} clientSecret the client secret (optional) 
   */
  getClient: function (clientId, clientSecret) {
    let client = undefined;
    try {
      client = db.getClient(clientId, clientSecret);
    } catch (err) {
      err.log();
    }
    return client ? {
      id: client.id,
      redirectUris: client.redirectUris,
      grants: client.grants
    } : undefined;
  },

  /**
   * Invoked to retrieve a user using a username/password combination.
   * @param {String} username The username of the user 
   * @param {String} password The password of the user
   */
  getUser: function (username, password) {
    let user = undefined;
    try {
      user = db.getUserByCredentials(username, password);
    } catch (err) {
      err.log();
    }
    return user;
  },

  /**
   * Invoked to retrieve the user associated with the specified client.
   * @param {Client} client the client which contains the user's ID
   */
  getUserFromClient: function (client) {
    let user = undefined;
    try {
      user = db.getUserById(client.userid);
    } catch (err) {
      err.log();
    }
    return user;
  },

  /**
  * Invoked to save an access token and optionally a refresh token, depending on the grant type.
  * @param {Object} token The token(s) to be saved.
  * @param {Object} client The client associated with the token(s).
  * @param {Object} user The user associated with the token(s).
  */
  saveToken: function (token, client, user) {
    let access = undefined;
    let refresh = undefined;
    let _client = {};
    let _user = {};
    try {
      access = db.saveAccessToken({ accessToken: token.accessToken, expiresAt: token.accessTokenExpiresAt, scope: token.scope, clientid: client.id, userid: user.id });
      if (token.refreshToken) {
        refresh = db.saveRefreshToken({ refreshToken: token.refreshToken, expiresAt: token.refreshTokenExpiresAt, scope: token.scope, clientid: client.id, user: user.id });
      } else {
        refresh = {};
      }
      _client = db.getClient(access.clientid);
      _user = db.getUserById(access.userid);

    } catch (err) {
      err.log();
    }
    if (access && refresh) {
      return {
        accessToken: access.accessToken,
        accessTokenExpiresAt: access.expiresAt,
        refreshToken: refresh.refreshToken,
        refreshTokenExpiresAt: refresh.expiresAt,
        scope: access.scope,
        client: _client,
        user: _user
      }
    } else {
      return false;
    }
  },

  /**
   * Invoked to save an authorization code.
   * @param {Object} code The code to be saved.
   * @param {Object} client The client associated with the authorization code.
   * @param {Object} user The user associated with the authorization code.
   */
  saveAuthorizationCode: function (code, client, user) {
    let authCode = undefined;
    try {
      authCode = db.saveAuthorizationCode({ code: code.authorizationCode, expiresAt: code.expiresAt, redirectUri: code.redirectUri, scope: code.scope, clientid: client.id, userid: user.id });
    } catch (err) {
      err.log();
    }
    if (authCode) {
      return { authorizationCode: authCode.code, expiresAt: authCode.expiresAt, redirectUri: authCode.redirectUri, scope: authCode.scope, client: db.getClient(authCode.clientid), user: db.getUserById(authCode.userid) }
    } else {
      return false;
    }
  },

  /**
   * Invoked to revoke a refresh token.
   * @param {Object} token The token to be revoked.
   */
  revokeToken: function(token) {
    let ok = false;
    try {
      ok = !!db.deleteRefreshToken(token.refreshToken);
    } catch (err) {
      err.log();
    }
    return ok;
  },

  /**
   * Invoked to revoke an authorization code.
   * @param {Object} code The code to be revoked.
   */
  revokeAuthorizationCode: function(code) {
    let ok = false;
    try {
      ok = !!db.deleteAuthorizationCode(code.code);
    } catch (err) {
      err.log();
    }
    return ok;
  }
};