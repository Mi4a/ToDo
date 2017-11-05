const app = angular.module('app',['ngRoute', 'ngCookies']);

app.config(function($routeProvider){
    $routeProvider
        .when('/', {
            templateUrl: 'public/HTML/start.html',
            controller: ""
        })
        .when('/todo', {
            templateUrl: 'public/HTML/todoListTemplate.html',
            controller: ""
        })
        .when('/:id', {
                templateUrl: 'public/HTML/newTodoTemplate',
                controller: ""
            }
        )
        .when('/new', {
                templateUrl: 'public/HTML/newTodoTemplate',
                controller: ""
            }
        )
        .otherwise({ redirectTo: '/' });
});