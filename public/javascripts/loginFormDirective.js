app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/loginTemplate.html',
        controller: 'loginController',
        controllerAs: 'log'
    };
});

app.controller('loginController', function ($scope, $location, $cookieStore, $rootScope, $http) {

    $scope.isLogin = $rootScope.isLogin || false;
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
            .then(function success(user) {
                    if (data !== []) {
                        $rootScope.userName = user.data.username;
                        console.log(user);
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