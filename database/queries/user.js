module.exports = {
  'GET_USER_BY_ID': 'SELECT * FROM T_User WHERE PK_User=?',
  'GET_USER_BY_CREDENTIALS': 'SELECT * FROM T_User WHERE mail=?',
  'ADD_USER': 'INSERT INTO T_User (username, avatar, isAdmin, mail, humblemail, apps, twofa, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
  'DELETE_USER': 'DELETE FROM T_User WHERE username=?'
};