app.controller("todoListController", function ($scope, $location, $rootScope, $resource) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';

    $scope.getTodos = $resource('/todo/:username');
    $scope.getTodos.query({username: $rootScope.userName}, function (res) {
        $scope.todoList = res;
    }, function (err) {
        console.log(err);
    });

    $scope.createNewTodo = function () {
        $location.path('/new');
    };

    $scope.editTodo = function (id) {
        $rootScope.todoId = id;
        $location.path('/new')
    };

    $scope.delete = function (todo) {
        let index = $scope.todoList.indexOf(todo);
        $scope.delTodos = $resource('/todo/:id');
        $scope.delTodos.delete({id: todo.id}, function (res) {
            console.log(res);
            alert('Todo deleted!');
            $scope.todoList.splice(index,1);
        },  function error(error) {
            console.log(error);
            alert("We cant delete this")
        })
    }
});
