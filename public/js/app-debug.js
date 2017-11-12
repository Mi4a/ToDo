const app = angular.module('app',['ngRoute', 'ngResource']);

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
app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/loginTemplate.html',
        controller: 'loginController',
        controllerAs: 'log'
    };
});

app.controller('loginController', function ($scope, $location, $rootScope, $http, $resource) {

    $scope.name = $rootScope.userName || false;
    $scope.username = "";
    $scope.password = "";
    $scope.dataLoading = false;

    $scope.login = function () {

        $scope.userLogin = $resource('/users/login');
        $scope.userLogin.get({username: $rootScope.username, password: $scope.password},
            function (res) {
            console.log('res:', res);
                if (res !== {}) {
                    $rootScope.userName = res.username;
                    console.log($rootScope.userName);
                    $scope.dataLoading = false;
                    $location.path('/todo');
                } else {
                    $scope.dataLoading = false;
                    alert('Some error happened! Try enter login/password one more time!')
                }
            }, function (err) {
                console.log(err);
                $scope.dataLoading = false;
                alert("Invalid login/password! Please try again!")
            })
    };

    $scope.registration = function () {

        $scope.userReg = $resource('/users/registration');
        $scope.userReg.save({}, {username: $scope.username, password: $scope.password}, function (res) {
            console.log(res);
            alert ('Thank you for registration!');
        }, function (err) {
            $scope.dataLoading = false;
            console.log(err);
            alert('User already exist');
        })
    };

});
app.controller("newTodoController", function ($scope, $resource, $location, $rootScope) {

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
        if($scope.todoId) data.id = $scope.todoId;

        $scope.userReg = $resource('/todo');
        $scope.userReg.save({}, data, function (res) {
            console.log(res);
            $scope.newTodo = "";
            alert('New Todo added!');
            $location.path('/todo');
        }, function (err) {
            console.log(err);
            alert("New Todo not added! Sorry!")
        })

/*        let newData = {
            username: $scope.username,
            description: $scope.newTodo
        };
        if($scope.todoId) newData.id = $scope.todoId;
        let data = $.param(newData);

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        $http.post('/todo', data, config)
            .then(function success(response) {
                console.log(response);
                $scope.newTodo = "";
                alert('New Todo added!');
                $location.path('/todo');
                },
                function error(error) {
                    console.log(error);
                    alert("New Todo not added! Sorry!")
                });*/

    }

});
app.controller("todoListController", function ($scope, $http, $location, $rootScope, $resource) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';

    $scope.getTodos = $resource('/todo/:username');
    $scope.getTodos.query({username: $rootScope.userName}, function (res) {
        $scope.todoList = res;
    }, function (err) {
        console.log(err);
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
            alert('Todo deleted!');
            $scope.todoList.splice(index,1);
        },  function error(error) {
            console.log(error);
            alert("We cant delete this")
        })
    }
});

app.directive("logoutButton", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/logoutButtonTemplate.html',
        controller: 'logoutController'
    };
});

app.controller('logoutController', function ($scope, $location, $resource, $rootScope) {
    $scope.logout = function () {
        $scope.logout = $resource('/users/logout');
        $scope.logout.get({}, function success() {
            console.log("Logout succeed");
            $rootScope.userName = false;
            $location.path('/')
        }, function error() {
            console.log("Logout went wrong");
        });
    };
});