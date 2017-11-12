const express = require('express');
const router = express.Router();
const db = require('../dbModels');

router.get('/favicon.ico', function(req, res, next) {
  res.sendStatus(200);
})
    .get('/:username', function(req, res, next) {
        let name = req.params.username;
        console.log('new request from:', name);
        db.todo.findAll({where: {username: name}}).then((todo) => {
            if (todo !== null) {
                console.log(todo);
                res.json(todo);
            } else {
                res.sendStatus(401);
            }
        });
    })
    .post('/', function(req, res, next) {
        console.log('NewTodo request with:', req.body);

        let newTodo = {
            username: req.body.username,
            description: req.body.description
        };
        if(req.body.id) {
            newTodo.id = req.body.id;

            db.todo.update({ description: newTodo.description }, { where: { id: newTodo.id } }).then((arr) => {
                if (arr !== []){
                    console.log('todo updated');
                    res.json({
                        success: true,
                        data: {
                            message: 'Todo updated',
                        }
                    });
                } else {
                    res.sendStatus(401);
                }
            })
        } else {
            db.todo.create(newTodo).then((todo) => {
                if (todo !== null) {
                    console.log('after adding attempt we get:', todo.dataValues);
                    res.json({
                        success: true,
                        data: {
                            message: 'Todos added',
                            todo: todo.dataValues
                        }
                    });
                } else {
                    res.sendStatus(401);
                }
            })
        }
    })
    .delete('/:id', function(req, res) {
        console.log('delete request:', req.body);

        db.todo.destroy({where: {id: req.params.id}}).then(function (num) {
            if(num){
                res.json({
                    success: true,
                    data: {
                        message: 'Todo deleted',
                    }
                });
            } else {
                res.sendStatus(401);
            }
        })
    });


module.exports = router;
