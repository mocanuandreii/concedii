var myApp = angular.module('myApp', ['ngStorage']);

myApp.controller('loginCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', function ($scope, $http, $localStorage, $sessionStorage) {

    $scope.login = function () {

        $http({
            method: 'GET',
            url: '/api/user/' + $scope.username
        }).then(function successCallback(response) {
            if (angular.isUndefined(response.data[0])) {
                alert("Email-ul nu este in baza de date");
            } else {
                if (response.data[0].password === $scope.password) {

                    $sessionStorage.username = response.data[0].username;
                    $sessionStorage.id = response.data[0].id;
                    $sessionStorage.email = response.data[0].email;
                    $sessionStorage.role = response.data[0].role;
                    $sessionStorage.firstName = response.data[0].first_name;
                    $sessionStorage.lastName = response.data[0].last_name
                    $sessionStorage.address = response.data[0].address;
                    $sessionStorage.company_id = response.data[0].company_id;

                    $http({
                        method: 'GET',
                        url: '/api/company/' + $sessionStorage.company_id
                    }).then(function successCallback(response) {
                        if (angular.isUndefined(response.data[0].name)) {
                            console.log("Error Company Name");
                        } else {
                            $sessionStorage.company_name = response.data[0].name;
                            window.location.assign("http://localhost:3000/Main.html");
                        }
                    }, function errorCallback(response) {
                        console.log("error");
                    });

                } else {
                    alert("Parola Gresita!");
                }
            }
        }, function errorCallback(response) {
            console.log("error");
        });
    }

}]);

