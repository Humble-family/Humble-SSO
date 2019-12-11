
module.exports = router => {
    router.get('/', (req, res) => {
        res.sendfile(__dirname + '/public/index.html');
    });
  }