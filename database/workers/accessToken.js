const pool = require('./pool');
const queries = require('./queries/accessToken');

const getAccessToken = at => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_ACCESS_TOKEN, [at]);
    if(res) return new AccessToken(res.PK_AccessToken, res.accessToken, res.grants, res,secret, res.userid); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const saveAccessToken = at => {

};

module.exports = {
  getAccessToken, saveAccessToken
};