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

app.controller('loginController', function ($scope, $location, $rootScope, $http) {

    $scope.name = $rootScope.userName || false;
    $scope.username = "";
    $scope.password = "";
    $scope.dataLoading = false;

    $scope.login = function () {

        let data = $.param({
            username: $scope.username,
            password: $scope.password
        });

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        $scope.dataLoading = true;

        $http.post('/users/login', data, config)
            .then(function success(response) {
                    if (response !== []) {
                        $rootScope.userName = response.data.data.user.username;
                        console.log($rootScope.userName);
                        $scope.dataLoading = false;
                        $location.path('/todo');
                    } else {
                        $scope.dataLoading = false;
                        alert('Some error happened! Try enter login/password one more time!')
                    }
                },
                function error(error) {
                    console.log(error);
                    $scope.dataLoading = false;
                    alert("Invalid login/password! Please try again!")
                });
    };

    $scope.registration = function () {

        let data = $.param({
            username: $scope.username,
            password: $scope.password
        });
        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        $scope.dataLoading = true;
        $http.post('/users/registration', data, config)
            .then(function success(response) {
                console.log(response);
                $rootScope.userName = response.data.data.user.username;
                alert ('Thank you for registration!');
                $location.path("/todo");
            }, function error(data) {
                $scope.dataLoading = false;
                console.log(data.statusText);
                alert('User already exist');
            })
    };

});
app.controller("newTodoController", function ($scope, $http, $location, $rootScope) {

    $scope.todoId = $rootScope.todoId || false;
    $scope.newTodo = "";
    $scope.username = $rootScope.userName || false;

    $scope.cancel = function () {
        $location.path('/todo');
    };

    $scope.createNewTodo = function () {
        let newData = {
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
                });

    }

});
app.controller("todoListController", function ($scope, $http, $location, $rootScope) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';
    $http.get('/todo/' + $scope.userName)
        .then(response => {
            console.log(response.data.data.todo);
            $scope.todoList = response.data.data.todo;
            },
            error => console.log("Shit heppends"));

    $scope.createNewTodo = function () {
        $location.path('/new');
    };

    $scope.editTodo = function (id) {
        $rootScope.todoId = id;
        $location.path('/new')
    };

    $scope.delete = function (todo) {

        let data = $.param({
            username: $scope.userName,
            id: todo.id
        });

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };

        let index = $scope.todoList.indexOf(todo);

        $http.post('/todo/delete', data, config)
            .then(function success(res) {
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

app.controller('logoutController', function ($scope, $location, $http, $rootScope) {
    $scope.logout = function () {
        $http.get('/users/logout')
            .then(function success() {
                console.log("Logout succeed");
                $rootScope.userName = false;
                $location.path('/')
            }, function error() {
                console.log("Logout went wrong");
            });
    };
});