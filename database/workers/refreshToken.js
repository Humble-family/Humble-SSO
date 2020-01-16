const pool = require('./pool');
const queries = require('./queries/refreshToken');

const getRefreshToken = rt => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_REFRESH_TOKEN, [rt]);
    if(res) return new RefreshToken(res.PK_RefreshToken, res.refreshToken, res.grants, res,secret, res.userid); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const saveRefreshToken = rt => {

};

module.exports = {
  getRefreshToken, saveRefreshToken
};