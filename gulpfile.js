const gulp = require('gulp'),
    mysql = require('mysql2'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    del = require('del'),
    db = require('./dbModels'),
    minify = require('gulp-minify');

gulp.task('db:start', function() {

    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'admin',
        password : 'admin'
    });

    connection.connect(function(err) {
        if (err) {
            console.error('error connecting: ' + err.stack);
            return;
        }

        console.log('connected as id ' + connection.threadId);
    });

    connection.query('create database todo', function (err) {
        if (err) throw err;
        console.log(err);
    });

    connection.end();

});

gulp.task('db:sync', function () {
    db.user.sync({force: true}).then(() => {
        return db.user.create({
            username: 'Dimon',
            password: '1234'
        });
    });

    db.todo.sync({force: true}).then(() => {
        console.log('tables created');
    });
});

gulp.task('db:drop', function () {
    const connection = mysql.createConnection({
        host     : 'localhost',
        user     : 'admin',
        password : 'admin'
    });

    connection.connect();

    //create database
    connection.query('drop database todo', function(err) {
        if (err) throw err;
        console.log(err);
    });

    connection.end();
});

gulp.task('js:build', function() {
    gulp.src(['public/javascripts/routes.js',
        'public/javascripts/loginFormDirective.js',
        'public/javascripts/newTodoController.js',
        'public/javascripts/todoListController.js',
        'public/javascripts/logoutButtonDirective.js'])
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(minify({
            ext:{
                src:'-debug.js',
                min:'.js'
            }
        }))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('clean', function() {
    return del.sync('public/js/');
});