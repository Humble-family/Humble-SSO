const moment = require('moment');

const queries = require('../queries/authorizationCode');
const AuthorizationCode = require('../../proto/AuthorizationCode');
const BackendError = require('../../proto/BackendError');

const getAuthorizationCode = async (conn, ac) => {
  try {
    const [res] = await conn.query(queries.GET_AUTHORIZATION_CODE, [ac]);
    if(res) return new AuthorizationCode(res.PK_AuthorizationCode, res.code, moment.unix(res.expiresAt).toDate(), res.redirectUri, res.scope, res.FK_Client, res.FK_User); 
    else throw new BackendError(404, `Authorization code ${ac} not found`);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve authorization code ${ac}`, err.mesage);
  }
};

const saveAuthorizationCode = async (conn, ac) => {
  try {
    const res = await conn.query(queries.ADD_AUTHORIZATION_CODE, [
      ac.code,
      moment().unix(ac.expiresAt),
      ac.redirectUri,
      ac.scope,
      parseInt(ac.clientid),
      parseInt(ac.userid)
    ]);
    return res.insertId;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to create a new authorization code ${ac}`, err.mesage);
  }
};

const deleteAuthorizationCode = async (conn, ac) => {
  try {
    const res = await conn.query(queries.DELETE_AUTHORIZATION_CODE, [ac]);
    return res.affectedRows === 1;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to delete authorization code ${ac}`, err.mesage);
  }
};

module.exports = {
  getAuthorizationCode, saveAuthorizationCode, deleteAuthorizationCode
};