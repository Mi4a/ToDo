const app = angular.module('app',['ngRoute', 'ngResource','ngAnimate', 'toastr']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: '../HTML/start.html',
            controller: ""
        })
        .when('/todo', {
            templateUrl: '../HTML/todoListTemplate.html',
            controller: ""
        })
        .when('/new', {
            templateUrl: '../HTML/newTodoTemplate.html',
            controller: ""
            }
        )
        .otherwise({ redirectTo: '/' });
});