app.directive("registrationForm", function() {
    return {
        restrict : 'E',
        templateUrl : '../HTML/registrationTemplate.html',
        controller: 'regController',
        controllerAs: 'reg'
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
                .then(function success() {
                    $scope.dataLoading = false;
                    alert ('Thank you for registration!');
                    $rootScope.isLogin = true;
                    $location.path("/");
                }, function error(data) {
                    $scope.dataLoading = false;
                    console.log(data.statusText);
                    alert('User already exist');
                })} else {
            alert ('Passwords don`t match. Try enter it one more time!');
            $scope.dataLoading = false;
        }
    };
});