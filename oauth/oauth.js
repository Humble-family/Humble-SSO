const OAuth2Server = require('oauth2-server');
const OARequest = OAuth2Server.Request;
const OAResponse = OAuth2Server.Response;
const Response = require('../proto/Response');

const oauth = new OAuth2Server({
  model: require('./model'),
  accessTokenLifetime: 4 * 60 * 60,
  allowBearerTokensInQueryString: true
});

module.exports = router => {
  router.get('/oauth2/token', (req, res) => {
    res.send('HOI');
  });

  router.post('/oauth2/token', (req, res) => {
    var request = new OARequest(req);
	  var response = new OAResponse(res);
    oauth.authenticate(request, response)
    .then((token) => {
      new Response(200, {token}, 'Bienvenue').send(res);
    })
    .catch((err) => {
      new Response(err.code, {err}, err.message).send(res);
    });
  });

  router.get('/oauth2/authorize', (req, res) => {
    const {client_id, redirect_uri, scope, state} = req.params;
  });

}