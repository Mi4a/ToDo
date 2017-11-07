app.controller("todoListController", function ($scope, $http, $location, $rootScope) {
    let todoList = [];
    let userName = $rootScope.userName || 'Someones';
    $http.get('/' + $rootScope.userName)
        .then(response => todoList = response.data, error => console.log("Shit heppens"));
});
