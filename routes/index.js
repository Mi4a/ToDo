const express = require('express');
const router = express.Router();
const db = require('../dbModels');

router.get('/favicon.ico', function(req, res, next) {
  res.sendStatus(200);
})
    .get('/:id', function(req, res, next) {
        let name = req.params.id;
        console.log('new request from:', name);
        db.todo.findAll({where: {username: name}}).then((user) => {
            if (user === null) {
                console.log(user);
                res.json({
                    success: true,
                    data: {
                        message: 'Todos find',
                        user: user
                    }
                });
            } else {
                res.sendStatus(401);
            }
        });
    })
    .post('/', function(req, res, next) {
        res.render('index', { title: 'Express' });
    })
    .post('/:id', function(req, res, next) {
        let id = req.params.id;
        res.render('index', { title: 'Express' });
    });

module.exports = router;
