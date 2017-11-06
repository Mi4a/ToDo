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

app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/loginTemplate.html',
        controller: 'loginController'
    };
});

app.controller('loginController', function ($scope, $location, $cookieStore, $rootScope, $http) {

    $scope.isLogin = $rootScope.isLogin || false;
    $scope.username = "";
    $scope.password = "";
    $scope.dataLoading = false;

    $scope.login = function () {

        let data = $.param({
            name: $scope.username,
            password: $scope.password
        });

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        $scope.dataLoading = true;

        $http.post('/users/login', data, config)
            .then(function success(user) {
                    if (data !== []) {
                        $rootScope.userName = user.data.username;
                        $rootScope.isLogin = true;
                        $scope.dataLoading = false;
                        $location.path('/');
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
    }
});
app.directive("logoutForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/loguotTemplate.html',
        controller: 'logoutController'
    };
});

app.controller('logoutController', function ($scope, $location, $http) {
    $scope.logout = function () {
        $http.get('/users/logout')
            .then(function success(responce) {
                console.log("Logout succeed");
                $location.path('/')
            }, function error() {
                console.log("Logout went wrong");
            });
    };
});
app.directive("registrationForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/registrationTemplate.html',
        controller: 'regController',
    };
});

app.controller('regController', function ($scope, $location, $http, $rootScope) {

    $scope.isLogin = $rootScope.isLogin || false;
    $scope.username = "";
    $scope.password = "";
    $scope.checkPassword = "";
    $scope.dataLoading = false;
    $scope.register = function () {

        if ($scope.password === $scope.checkPassword){
            let data = $.param({
                name: $scope.username,
                password: $scope.password
            });
            let config = {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
                }
            };
            $scope.dataLoading = true;
            $http.post('/users/registration', data, config)
                .then(function success() {
                    $scope.dataLoading = false;
                    alert ('Thank you for registration!');
                    $rootScope.isLogin = true;
                    $location.path("/");
                }, function error(data) {
                    $scope.dataLoading = false;
                    console.log(data);
                })} else {
            alert ('Passwords don`t match. Try enter it one more time!');
            $scope.dataLoading = false;
        }
    };
});

