const app = angular.module('app', ['ngRoute', 'route-segment', 'view-segment', 'ngResource', 'ngAnimate', 'toastr']);

app.config(function ($routeSegmentProvider) {
    $routeSegmentProvider
        .when('/', 'start')
        .when('/todo', 'todo')
        .when('/new', 'new')
        .segment('start', {
            default: true,
            templateUrl: '../HTML/start.html'
        })
        .segment('todo', {
            templateUrl: '../HTML/todoListTemplate.html',
            controller: 'todoListController'
        })
        .segment('new', {
            templateUrl: '../HTML/newTodoTemplate.html',
            controller: 'newTodoController'
        })
});