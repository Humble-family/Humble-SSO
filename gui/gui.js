
const translations = require('./translations');

module.exports = router => {
    router.get('/', (req, res) => {
        res.sendfile(__dirname + '/public/index.html');
    });
    router.get('/translations', (req, res) => {
        res.send(translations);
    });
  }