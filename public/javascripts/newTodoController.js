app.controller("newTodoController", function ($scope, $resource, $location, $rootScope, toastr) {

    $scope.todoId = $rootScope.todoId || false;
    $scope.newTodo = "";
    $scope.username = $rootScope.userName || false;

    $scope.cancel = function () {
        $location.path('/todo');
    };

    $scope.createNewTodo = function () {

        let data = {
            username: $scope.username,
            description: $scope.newTodo
        };
        if($scope.todoId) data.id = $scope.todoId;

        $scope.userReg = $resource('/todo');
        $scope.userReg.save({}, data, function (res) {
            console.log(res);
            $scope.newTodo = "";
            toastr.success('We write your ToDo', 'All is OK!');
            $location.path('/todo');
        }, function (err) {
            console.log(err);
            toastr.error('New Todo not added! Sorry!', 'Error');
        })
    }

});