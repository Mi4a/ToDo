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