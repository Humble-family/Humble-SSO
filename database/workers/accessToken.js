const moment = require('moment');

const AccessToken = require('../../proto/AccessToken');
const queries = require('../queries/accessToken');
const BackendError = require('../../proto/BackendError');

const getAccessToken = async (conn, at) => {
  try {
    const [res] = await conn.query(queries.GET_ACCESS_TOKEN, [at]);
    if(res) {
      return new AccessToken(res.PK_AccessToken, res.accessToken, moment.unix(res.expiresAt).toDate(), res.scope, res.FK_Client, res.FK_User); 
    } else {
      throw new BackendError(404, `Access token ${at} not found`);
    }
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve access token ${at}`, err.mesage);
  }
};

const saveAccessToken = async (conn, at) => {
  try {
    const res = await conn.query(queries.ADD_ACCESS_TOKEN, [
      at.accessToken,
      moment().unix(at.expiresAt),
      at.scope,
      parseInt(at.clientid),
      parseInt(at.userid)
    ]);
    return res.insertId;
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to create a new access token ${at.accessToken}`, err.message);
  }
};

module.exports = {
  getAccessToken, saveAccessToken
};