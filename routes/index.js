const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
})
    .get('/:id', function(req, res, next) {
        let id = req.params.id;
        res.render('index', { title: 'Express' });
    })
    .post('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    })
    .post('/:id', function(req, res, next) {
        let id = req.params.id;
        res.render('index', { title: 'Express' });
    });

module.exports = router;
