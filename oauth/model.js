const db = require('../db/database');

module.exports = {

    getAccessToken: function() {
      return new Promise('works!');
    },
  
    getAuthorizationCode: function(done) {
      done(null, 'works!');
    },
  
    getClient: function*() {
      yield somethingAsync();
      return 'works!';
    },
  
    getUser: async function() {
      await somethingAsync();
      return 'works!';
    }
  };
