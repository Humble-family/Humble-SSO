const queries = require('../queries/client');
const Client = require('../../proto/Client');
const BackendError = require('../../proto/BackendError');

const getClient = async (conn, client, secret) => {
  try {
    const [res] = await conn.query(queries.GET_CLIENT, [client]);
    if(res) {
      if(!secret || (secret && res.secret === secret)) {
        return new Client(res.PK_Client, res.redirectUris, res.grants, res.secret, res.userid);
      } else {
        throw new BackendError(403, 'Secret is incorrect');
      }
    } else {
      throw new BackendError(500, `Impossible to retrieve client ${client}`);
    }
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve client ${client}`, err.mesage);
  }
};

module.exports = {
  getClient
};