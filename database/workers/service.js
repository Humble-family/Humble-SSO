const queries = require('../queries/service');
const Service = require('../../proto/Service');
const BackendError = require('../../proto/BackendError');

const getService = async (conn, service) => {
  try {
    const [res] = await conn.query(queries.GET_SERVICE, [service]);
    if(res) return new Service(res.PK_Service, res.name, res.url); 
    else throw new BackendError(404, `Service ${service} not found`);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, `Impossible to retrieve service ${service}`);
  }
};

const getServices = async conn => {
  try {
    return await conn.query(queries.GET_SERVICES);
  } catch(err) {
    console.error(err);
    throw new BackendError(500, 'Impossible to retrieve services');
  }
};

module.exports = {
  getService, getServices
};