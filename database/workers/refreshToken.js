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
    conn.beginTransaction();
    const res = await conn.query(queries.ADD_REFRESH_TOKEN, [rt.refreshToken, moment().unix(rt.expiresAt), rt.scope, parseInt(rt.clientid), parseInt(rt.userid)]);
    if(res.affectedRows === 1) {
      conn.commit();
      const [addedRT] = await conn.query(queries.GET_REFRESH_TOKEN, [rt.refreshToken]);
      if(addedRT) {
        return new RefreshToken(addedRT.PK_RefreshToken, addedRT.refreshToken, moment.unix(addedRT.expiresAt).toDate(), addedRT.scope, addedRT.FK_Client, addedRT.FK_User);
      } else {
        return undefined;
      } 
    } else {
      conn.rollback();
      return undefined;
    }
  } catch(err) {
    conn.rollback()
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const deleteRefreshToken = async rt => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const res = await conn.query(queries.DELETE_REFRESH_TOKEN, [rt]);
    if(res.affectedRows === 1) {
      conn.commit();
      return true;
    } else {
      conn.rollback();
      return false;
    }
  } catch(err) {
    conn.rollback();
    console.error(err);
    return false;
  } finally {
    if(conn) conn.end();
  }
};

module.exports = {
  getRefreshToken, saveRefreshToken, deleteRefreshToken
};