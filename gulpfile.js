const gulp = require('gulp'),
    mysql = require('mysql2'),
    plumber = require('gulp-plumber'),
    concat = require('gulp-concat'),
    wrap = require('gulp-wrap'),
    del = require('del');
    db = require('./dbModels');

const WRAP_TEMPLATE = '(function(){\n"use strict";\n<%= contents %>\n})();';

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
    gulp.src('public/javascripts/*.js')
        .pipe(plumber())
        .pipe(concat('app.js'))
        .pipe(wrap(WRAP_TEMPLATE))
        .pipe(gulp.dest('public/js/'));
});

gulp.task('clean', function() {
    return del.sync('public/js/');
});