module.exports = {
  'GET_REFRESH_TOKEN': 'SELECT * FROM T_RefreshToken WHERE refreshToken=?',
  'ADD_REFRESH_TOKEN': 'INSERT INTO T_RefreshToken (refreshToken, expiresAt, scope, FK_Client, FK_User) VALUES (?, ?, ?, ?, ?)', 
  'DELETE_REFRESH_TOKEN': 'DELETE FROM T_RefreshToken WHERE refreshToken=?'
};