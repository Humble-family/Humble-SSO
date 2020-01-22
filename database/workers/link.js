const pool = require('../pool');
const queries = require('../queries/link');
const {Link} = require('../../proto/Link');

const getLink = async link => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_AUTHORIZATION_CODE, [link]);
    if(res) return new Link(res.PK_Link, res.serviceid, res.FK_User, res.scopes, res.refreshToken, res.username); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

module.exports = {
  getLink
};