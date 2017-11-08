const express = require('express'),
    passport = require('passport'),
    db = require('../dbModels'),
    LocalStrategy = require('passport-local').Strategy,
    router = express.Router();

router.post('/registration', function(req, res, next) {
    console.log(req.body);

    let newUser = {
        username: req.body.username,
        password: req.body.password
    };

    db.user.findOne({where: {username: req.body.username}}).then((user) => {
      if (user === null) {
          db.user.create(newUser).then(res.json({
              success: true,
              data: {
                  message: 'Registration succeeded',
                  user: user.dataValues
              }
          }));
      } else {
          res.sendStatus(401);
      }
    });
});

passport.use('local', new LocalStrategy(
    function (username, password, done) {
        console.log('LocalStrategy check:', username, password);
        db.user.findOne({where: {username: username, password: password}})
            .then((user) => {
            if (user === null) { return done(null, false, { message: 'no such user'}); }
            if (!user) { return done(null, false); }
            console.log('localStrategy find:', user.dataValues);
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    console.log('start serialize with user:', user);
    done(null, user && user.dataValues.id);
});

passport.deserializeUser(function (id, done) {
    console.log('deserialize start with id:', id);
    db.user.findOne({where:{id: id}})
        .then(user => {
            if (user !== null) {
                console.log('deserialize user:', user.dataValues);
                done(null, user.dataValues);
            } else {
                return done(null, false, { message: 'Deserialize went wrong' });
            }
        })
});

router.post('/login', function(req, res, next) {
    console.log('login request: ', req.body);
    passport.authenticate('local', function(err, user, info) {
        console.log('auth done');
        if (err) return next(err); // will generate a 500 error

        // Generate a JSON response reflecting authentication status
        if (!user) {
            return res.json({
                success: false,
                data: {
                    message: 'Authentication failed',
                    details: info.message
                }
            });
        }

        req.logIn(user, function(err) {
            if (err) return next(err);
            console.log(user.dataValues);
            res.json({
                success: true,
                data: {
                    message: 'Authentication succeeded',
                    user: user
                }
            });
        });
    })(req, res, next);
});

router.get('/logout', function(req, res){
    req.logout();
    res.json({ success: true });
});

module.exports = router;
