const pool = require('../pool');
const queries = require('../queries/service');
const Service = require('../../proto/Service');

const getService = async service => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_SERVICE, [service]);
    if(res) return new Service(res.PK_Service, res.name, res.url); 
    else return undefined;
  } catch(err) {
    console.error(err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

const getServices = async () => {
  let conn;
  try {
    conn = await pool.getConnection();
    const [res] = await conn.query(queries.GET_SERVICES);
    if(res) return res;
    else return undefined;
  } catch(err) {
    console.error('Error when getting the services', err);
    return undefined;
  } finally {
    if(conn) conn.end();
  }
};

module.exports = {
  getService, getServices
};