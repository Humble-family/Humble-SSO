const OAuth2Server = require('oauth2-server');
const Request = OAuth2Server.Request;
const Response = OAuth2Server.Response;

const oauth = new OAuth2Server({
  model: require('./model'),
  accessTokenLifetime: 4 * 60 * 60,
  allowBearerTokensInQueryString: true
});

module.exports = router => {
  router.get('/oauth2/token', (req, res) => {
    res.send('HOI');
  });

  router.get('/oauth2/authorize', (req, res) => {
    const {client_id, redirect_uri, scope, state} = req.params;
  });

  const checkAuthentication = function (res, res, next) {
    let request = new Request(req);
    let response = new Response(res);
    return oauth.authenticate(request, response)
      .then(function (token) {
        next();
      }).catch(function (err) {
        res.status(err.code || 500).json(err);
      });
  }
}