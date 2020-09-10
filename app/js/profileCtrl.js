var myApp = angular.module('myApp', ['ngStorage']);

myApp.controller('profileCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {
    $scope.email = $sessionStorage.email;
    $scope.address = $sessionStorage.address;
    $scope.firstName = $sessionStorage.firstName;
    $scope.lastName = $sessionStorage.lastName;
    $scope.role = $sessionStorage.role;

    console.log($sessionStorage);
    $http({
        method: 'GET',
        url: 'api/records/' + $sessionStorage.id

    }).then(function successCallback(response) {
        $scope.vacations = response.data;

        }, function errorCallback(response) {
        console.log(response);
    });

}]);

