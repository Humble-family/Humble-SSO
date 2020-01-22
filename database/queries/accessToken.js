module.exports = {
  'GET_ACCESS_TOKEN': 'SELECT * FROM T_AccessToken WHERE accessToken=?',
  'ADD_ACCESS_TOKEN': 'INSERT INTO T_AccessToken (accessToken, expiresAt, scope, FK_Client, FK_User) VALUES (?, ?, ?, ?, ?)',
};