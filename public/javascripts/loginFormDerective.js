app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : 'public/HTML/loginTemplate',
        controller: 'loginController'
    };
});

app.controller('loginPathController', function ($scope, $location, $cookieStore, $rootScope, $http) {
    $scope.login = function () {



    };