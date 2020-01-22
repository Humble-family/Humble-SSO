const moment = require('moment');

const pool = require('../pool');
const queries = require('../queries/refreshToken');
const {RefreshToken} = require('../../proto/RefreshToken');

const getRefreshToken = async rt => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_REFRESH_TOKEN, [rt]);
    if(res) return new RefreshToken(res.PK_RefreshToken, res.refreshToken, moment.unix(res.expiresAt).toDate(), res.scope, res.FK_Client, res.FK_User); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const saveRefreshToken = async rt => {
  let conn;
  try {
    conn  = await pool.getConnection();
    const res = await conn.query(queries.ADD_REFRESH_TOKEN, [rt.refreshToken, moment().unix(rt.expiresAt), rt.scope, parseInt(rt.clientid), parseInt(rt.userid)]);
    if(res.affectedRows === 1) {
      const [addedRT] = await conn.query(queries.GET_REFRESH_TOKEN, [rt.refreshToken]);
      if(addedRT) {
        return new RefreshToken(addedRT.PK_RefreshToken, addedRT.refreshToken, moment.unix(addedRT.expiresAt).toDate(), addedRT.scope, addedRT.FK_Client, addedRT.FK_User);
      } else {
        return undefined;
      } 
    } else {
      return undefined;
    }
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const deleteRefreshToken = async rt => {

};

module.exports = {
  getRefreshToken, saveRefreshToken, deleteRefreshToken
};