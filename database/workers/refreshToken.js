const moment = require('moment');

const queries = require('../queries/refreshToken');
const RefreshToken = require('../../proto/RefreshToken');
const BackendError = require('../../proto/BackendError');

const getRefreshToken = async (conn, rt) => {
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_REFRESH_TOKEN, [rt]);
    if(res) return new RefreshToken(res.PK_RefreshToken, res.refreshToken, moment.unix(res.expiresAt).toDate(), res.scope, res.FK_Client, res.FK_User); 
    else throw new BackendError(404, `Refresh token ${rt} not found`, err.mesage);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve refresh token ${rt}`, err.message);
  }
};

const saveRefreshToken = async (conn, rt) => {
  try {
    const res = await conn.query(queries.ADD_REFRESH_TOKEN, [
      rt.refreshToken,
      moment().unix(rt.expiresAt),
      rt.scope,
      parseInt(rt.clientid),
      parseInt(rt.userid)
    ]);
    return res.insertId;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to create refresh token ${rt.refreshToken}`, err.message);
  }
};

const deleteRefreshToken = async (conn, rt) => {
  try {
    const res = await conn.query(queries.DELETE_REFRESH_TOKEN, [rt]);
    return res.affectedRows === 1;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to delete refresh token ${rt}`, err.message);
  }
};

module.exports = {
  getRefreshToken, saveRefreshToken, deleteRefreshToken
};