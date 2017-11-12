app.directive("loginForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/loginTemplate.html',
        controller: 'loginController',
        controllerAs: 'log'
    };
});

app.controller('loginController', function ($scope, $location, $rootScope, $resource) {

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