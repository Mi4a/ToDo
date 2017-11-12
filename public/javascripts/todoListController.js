app.controller("todoListController", function ($scope, $location, $rootScope, $resource, toastr) {
    $scope.todoList = [];
    $scope.userName = $rootScope.userName || 'Someones';

    $scope.getTodos = $resource('/todo/:username');
    $scope.getTodos.query({username: $rootScope.userName}, function (res) {
        $scope.todoList = res;
        console.log(res);
    }, function (err) {
        console.log(err);
        toastr.error('We cant find your ToDO`s', 'Error');
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
            toastr.info('Todo deleted!', 'Information');
            $scope.todoList.splice(index, 1);
        }, function error(error) {
            console.log(error);
            toastr.warning('We cant delete this', 'Warning');
        })
    }
});
