const moment = require('moment');

const pool = require('../pool');
const queries = require('../queries/authorizationCode');
const AuthorizationCode = require('../../proto/AuthorizationCode');

const getAuthorizationCode = async ac => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_AUTHORIZATION_CODE, [ac]);
    if(res) return new AuthorizationCode(res.PK_AuthorizationCode, res.code, moment.unix(res.expiresAt).toDate(), res.redirectUri, res.scope, res.FK_Client, res.FK_User); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const saveAuthorizationCode = async ac => {
  let conn;
  try {
    conn  = await pool.getConnection();
    conn.beginTransaction();
    const res = await conn.query(queries.ADD_AUTHORIZATION_CODE, [ac.code, moment().unix(ac.expiresAt), ac.redirectUri, ac.scope, parseInt(ac.clientid), parseInt(ac.userid)]);
    if(res.affectedRows === 1) {
      conn.commit();
      const [addedAC] = await conn.query(queries.GET_AUTHORIZATION_CODE, [ac.code]);
      if(addedAC) {
        return new AuthorizationCode(addedAC.PK_AuthorizationCode, addedAC.code, moment.unix(addedAC.expiresAt).toDate(), addedAC.redirectUri, addedAC.scope, addedAC.FK_Client, addedAC.FK_User);
      } else {
        return undefined;
      } 
    } else {
      conn.rollback();
      return undefined;
    }
  } catch(err) {
    conn.rollback();
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const deleteAuthorizationCode = async ac => {
  let conn;
  try {
    conn = await pool.getConnection();
    conn.beginTransaction();
    const res = await conn.query(queries.DELETE_AUTHORIZATION_CODE, [ac]);
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
  getAuthorizationCode, saveAuthorizationCode, deleteAuthorizationCode
};