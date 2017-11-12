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
app.directive("loginForm", function () {
    return {
        restrict: 'E',
        templateUrl: '../HTML/loginTemplate.html',
        controller: 'loginController',
        controllerAs: 'log'
    };
});

app.controller('loginController', function ($scope, $location, $rootScope, $resource, toastr) {

    $scope.name = $rootScope.userName || false;
    $scope.username = "";
    $scope.password = "";
    $scope.dataLoading = false;

    $scope.login = function () {

        $scope.userLogin = $resource('/users/login');
        $scope.userLogin.get({username: $rootScope.username, password: $scope.password},
            function (res) {
                if (res !== {}) {
                    $rootScope.userName = res.username;
                    $scope.dataLoading = false;
                    $location.path('/todo');
                } else {
                    $scope.dataLoading = false;
                    toastr.error('Some error happened! Try enter login/password one more time!', 'Error');
                }
            }, function (err) {
                console.log(err);
                $scope.dataLoading = false;
                toastr.error('Invalid login/password! Please try again!', 'Error');
            })
    };

    $scope.registration = function () {

        $scope.userReg = $resource('/users/registration');
        $scope.userReg.save({}, {username: $scope.username, password: $scope.password}, function (res) {
            console.log(res);
            toastr.success('Thank you for registration!');
        }, function (err) {
            $scope.dataLoading = false;
            console.log(err);
            toastr.warning('User already exist', 'Warning');
        })
    };

});
app.controller("newTodoController", function ($scope, $resource, $location, $rootScope, toastr) {

    $scope.todoId = $rootScope.todoId || false;
    $scope.newTodo = "";
    $scope.username = $rootScope.userName || false;

    $scope.cancel = function () {
        $location.path('/todo');
    };

    $scope.createNewTodo = function () {

        let data = {
            username: $scope.username,
            description: $scope.newTodo
        };
        if ($scope.todoId) data.id = $scope.todoId;

        $scope.userReg = $resource('/todo');
        $scope.userReg.save({}, data, function (res) {
            console.log(res);
            $scope.newTodo = "";
            toastr.success('We write your ToDo', 'All is OK!');
            $location.path('/todo');
        }, function (err) {
            console.log(err);
            toastr.error('New Todo not added! Sorry!', 'Error');
        })
    }

});
app.controller("todoListController", function ($scope, $location, $rootScope, $resource, toastr) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';

    $scope.getTodos = $resource('/todo/:username');
    $scope.getTodos.query({username: $rootScope.userName}, function (res) {
        $scope.todoList = res;
        console.log(res);
    }, function (err) {
        console.log(err);
        toastr.error('We cant find your ToDO`s', 'Error');
    });

    $scope.createNewTodo = function () {
        $location.path('/new');
    };

    $scope.editTodo = function (id) {
        $rootScope.todoId = id;
        $location.path('/new')
    };

    $scope.delete = function (todo) {
        let index = $scope.todoList.indexOf(todo);
        $scope.delTodos = $resource('/todo/:id');
        $scope.delTodos.delete({id: todo.id}, function (res) {
            console.log(res);
            toastr.info('Todo deleted!', 'Information');
            $scope.todoList.splice(index, 1);
        }, function error(error) {
            console.log(error);
            toastr.warning('We cant delete this', 'Warning');
        })
    }
});

app.directive("logoutButton", function () {
    return {
        restrict: 'E',
        templateUrl: '../HTML/logoutButtonTemplate.html',
        controller: 'logoutController'
    };
});

app.controller('logoutController', function ($scope, $location, $resource, $rootScope, toastr) {
    $scope.logout = function () {
        $scope.logout = $resource('/users/logout');
        $scope.logout.get({}, function success() {
            console.log("Logout succeed");
            $rootScope.userName = false;
            $location.path('/')
        }, function error() {
            toastr.error('Logout went wrong', 'Error');
        });
    };
});