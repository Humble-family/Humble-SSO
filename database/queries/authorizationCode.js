module.exports = {
  'GET_AUTHORIZATION_CODE': 'SELECT * FROM T_AuthorizationCode WHERE code=?',
  'ADD_AUTHORIZATION_CODE': 'INSERT INTO T_AuthorizationCode (code, expiresAt, redirectUri, scope, FK_Client, FK_User) VALUES (?, ?, ?, ?, ?, ?)',
  'DELETE_AUTHORIZATION_CODE': 'DELETE FROM T_AuthorizationCode WHERE code=?'
};