app.controller("newTodoController", function ($scope, $http, $location, $rootScope) {

    $scope.todoId = $rootScope.todoId || false;
    $scope.newTodo = "";
    $scope.username = $rootScope.userName || false;

    $scope.cancel = function () {
        $location.path('/todo');
    };

    $scope.createNewTodo = function () {
        let newData = {
            username: $scope.username,
            description: $scope.newTodo
        };
        if($scope.todoId) newData.id = $scope.todoId;
        let data = $.param(newData);

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };
        $http.post('/todo', data, config)
            .then(function success(response) {
                console.log(response);
                $scope.newTodo = "";
                alert('New Todo added!');
                $location.path('/todo');
                },
                function error(error) {
                    console.log(error);
                    alert("New Todo not added! Sorry!")
                });

    }

});