const queries = require('../queries/link');
const Link = require('../../proto/Link');
const BackendError = require('../../proto/BackendError');

const getLink = async (conn, link) => {
  try {
    const [res] = await conn.query(queries.GET_AUTHORIZATION_CODE, [link]);
    if(res) return new Link(res.PK_Link, res.serviceid, res.FK_User, res.scopes, res.refreshToken, res.username); 
    else throw new BackendError(404, `Link ${link} not found`);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve link ${link}`, err.message);
  }
};

module.exports = {
  getLink
};