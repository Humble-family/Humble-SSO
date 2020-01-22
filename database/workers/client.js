const pool = require('../pool');
const queries = require('../queries/client');
const {Client} = require('../../proto/Client');

const getClient = async (client, secret) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_CLIENT, [client]);
    if(res) {
      if(!secret || (secret && res.secret === secret)) {
        return new Client(res.PK_Client, res.redirectUris, res.grants, res.secret, res.userid);
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

module.exports = {
  getClient
};