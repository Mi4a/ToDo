const express = require('express'),
    passport = require('passport'),
    /*    md5 = require('md5'),*/
    db = require('../dbModels'),
    LocalStrategy = require('passport-local').Strategy,
    router = express.Router();

router.post('/registration', function(req, res, next) {
    console.log(req.body);
    /*    var newHash = md5(req.body.name + req.body.password + 'snif');*/

    let newUser = {
        username: req.body.name,
        password: req.body.password
    };

    db.user.findOne({where: {username: req.body.name}}).then((user) => {
      if (user === null) {
          db.user.create(newUser).then(res.sendStatus(200));
      } else {
          res.sendStatus(401);
      }
    });
});

passport.use(new LocalStrategy(
    function (username, password, done) {
        db.user.findOne({where: {username: username, password: password}})
            .then((user) => {
            /*if (user) {
                return done(null, user.dataValues);
            } else {
                return done(null, false, { message: 'Incorrect username or password.' });
            }*/
            if (user === null) { return done(null, false, { message: 'no such user'}); }
            if (!user) { return done(null, false); }
            if (!user.dataValues.verifyPassword(password)) { return done(null, false); }
            return done(null, user);
        });
    }
));

passport.serializeUser(function (user, done) {
    done(null, user && user.id);
});

passport.deserializeUser(function (id, done) {
    db.user.findOne({where:{id: id}})
        .then(user => {
            if (user !== null) {
                done(null, user.dataValues);
            } else {
                return done(null, false, { message: 'Deserialize went wrong' });
            }
        })
});

router.post('/login', function(req, res, next) {
    console.log('login request: ', req.body);
    passport.authenticate('local', function(err, user, info) {
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
