const app = angular.module('app',['ngRoute', 'ngCookies']);

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
        .when('/:id', {
                templateUrl: '../HTML/newTodoTemplate',
                controller: ""
            }
        )
        .when('/new', {
                templateUrl: '../HTML/newTodoTemplate',
                controller: ""
            }
        )
        .otherwise({ redirectTo: '/' });
});