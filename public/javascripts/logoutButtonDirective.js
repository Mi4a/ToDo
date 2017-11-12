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