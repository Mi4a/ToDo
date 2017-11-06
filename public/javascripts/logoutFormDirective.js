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