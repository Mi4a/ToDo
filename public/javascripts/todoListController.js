app.controller("todoListController", function ($scope, $http, $location, $rootScope) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';
    $http.get('/todo/' + $scope.userName)
        .then(response => {
            console.log(response.data.data.todo);
            $scope.todoList = response.data.data.todo;
            },
            error => console.log("Shit heppends"));

    $scope.createNewTodo = function () {
        $location.path('/new');
    };

    $scope.editTodo = function (id) {
        $rootScope.todoId = id;
        $location.path('/new')
    };

    $scope.delete = function (id) {

        let data = $.param({
            username: $scope.userName,
            id: id
        });

        let config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
            }
        };

        $http.post('/todo/delete', data, config)
            .then(function success(res) {
                console.log(res);
                alert('Todo deleted!');
            },  function error(error) {
                console.log(error);
                alert("We cant delete this")
            })
    }
});
