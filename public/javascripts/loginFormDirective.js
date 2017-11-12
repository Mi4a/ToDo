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