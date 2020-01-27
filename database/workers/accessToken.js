const moment = require('moment');

const {AccessToken} = require('../../proto/AccessToken');
const pool = require('../pool');
const queries = require('../queries/accessToken');

const getAccessToken = async at => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_ACCESS_TOKEN, [at]);
    if(res) {
      return new AccessToken(res.PK_AccessToken, res.accessToken, moment.unix(res.expiresAt).toDate(), res.scope, res.FK_Client, res.FK_User); 
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

const saveAccessToken = async at => {
  let conn;
  try {
    conn  = await pool.getConnection();
    conn.beginTransaction();
    const res = await conn.query(queries.ADD_ACCESS_TOKEN, [at.accessToken, moment().unix(at.expiresAt), at.scope, parseInt(at.clientid), parseInt(at.userid)]);
    if(res.affectedRows === 1) {
      conn.commit();
      const [addedAT] = await conn.query(queries.GET_ACCESS_TOKEN, [at.accessToken]);
      if(addedAT) {
        return new AccessToken(addedAT.PK_AccessToken, addedAT.accessToken, moment.unix(addedAT.expiresAt).toDate(), addedAT.scope, addedAT.FK_Client, addedAT.FK_User);
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

module.exports = {
  getAccessToken, saveAccessToken
};