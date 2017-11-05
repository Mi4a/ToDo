app.controller("todoListController", function ($scope, $http, $location, $rootScope) {
    $http.get('/')
        .then(response => this.list = response.data, error => console.log("Shit heppens"));

});
