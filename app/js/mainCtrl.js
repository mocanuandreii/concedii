function getNumWorkDays(startDate, endDate) {
    var numWorkDays = 0;
    var currentDate = new Date(startDate);
    while (currentDate <= endDate) {
        if (currentDate.getDay() !== 0 && currentDate.getDay() !== 6) {
            numWorkDays++;
        }
        currentDate = currentDate.addDays(1);
    }
    return numWorkDays;
}

Date.prototype.addDays = function (days) {
    var date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
};

var myApp = angular.module('myApp', ['ngMaterial', 'ngMessages', 'material.svgAssetsCache', 'ngStorage'])

myApp.controller('mainCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', '$mdDialog', function ($scope, $http, $localStorage, $sessionStorage, $mdDialog) {

    $http({
        method: 'GET',
        url: '/api/user/' + $sessionStorage.username
    }).then(function successCallback(response) {
        $scope.vacationDays = response.data[0].vacationDays;
    }, function errorCallback(response) {
        console.log("error");
    });

    $scope.minDate = new Date();
    $scope.startDate = new Date();
    $scope.endDate = new Date();

    $scope.showDOW = function (ev) {

        $scope.workingDays = getNumWorkDays($scope.startDate, $scope.endDate);

        $mdDialog.show({
            locals: {
                email: $sessionStorage.email,
                startDate: $scope.startDate.toISOString().slice(0, 19).replace('T', ' '),
                endDate: $scope.endDate.toISOString().slice(0, 19).replace('T', ' '),
                role: $sessionStorage.role,
                name: $sessionStorage.firstName + ' ' + $sessionStorage.lastName,
                workingDays: $scope.workingDays,
                company_name: $sessionStorage.company_name
            },
            controller: DialogController,
            templateUrl: 'dialogDOW.tmpl.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: false
        })
            .then(function (answer) {
                $scope.status = 'You said the information was "' + answer + '".';
            }, function () {
                $scope.status = 'You cancelled the dialog.';
            });

    };

    function DialogController($scope, $mdDialog, email, startDate, endDate, role, name, workingDays, company_name) {

        $scope.startDate = startDate.split(' ')[0];
        $scope.endDate = endDate.split(' ')[0];
        $scope.email = email;
        $scope.currentDate = new Date();
        $scope.currentDate = $scope.currentDate.toISOString().slice(0, 19).replace('T', ' ').split(' ')[0];
        $scope.role = role;
        $scope.name = name;
        $scope.workingDays = workingDays;
        $scope.company_name = company_name;

        $scope.printToCart = function (printSectionId) {
            var innerContents = document.getElementById(printSectionId).innerHTML;
            var popupWinindow = window.open('', '_blank', 'width=800,height=900,scrollbars=no,menubar=no,toolbar=no,location=no,status=no,titlebar=no');
            popupWinindow.document.open();
            popupWinindow.document.write('<html><head><link rel="stylesheet" type="text/css" href="style.css" /></head><body onload="window.print()">' + innerContents + '</html>');
            popupWinindow.document.close();
        }
        $scope.download2 = function (downloadSectionId) {

            html2canvas(document.getElementById('printSectionId'), {
                onrendered: function (canvas) {
                    var data = canvas.toDataURL();
                    var docDefinition = {
                        content: [{
                            image: data,
                            width: 550
                        }]
                    };
                    pdfMake.createPdf(docDefinition).download("Cerere Concediu ("+ $scope.startDate + " - " + $scope.endDate + ").pdf");
                }
            });
        }


        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.sendMail = function () {
            $http({
                method: 'get',
                url: '/api/template/Concediu'
            }).then(function successCallback(response) {

                $scope.html = response.data[0].html;
                $scope.subject = response.data[0].subject;

                $http({
                    method: 'post',
                    url: '/email',
                    data: {
                        'name': $scope.name,
                        'company_name': $scope.company_name,
                        'email': $sessionStorage.email,
                        'role': $sessionStorage.role,
                        'startDate': $scope.startDate,
                        'endDate': $scope.endDate,
                        'workingDays': $scope.workingDays,
                        'currentDate': $scope.currentDate,
                        'html': $scope.html,
                        'subject': $scope.subject
                    }
                }).then(function successCallback(response) {

                }, function errorCallback(response) {
                    console.log("error");
                });


            }, function errorCallback(response) {
                console.log("error");
            });
            $mdDialog.hide();

        };
    }

    $scope.addVacation = function () {

        $scope.currentDate = new Date();
        $scope.workingDays = getNumWorkDays($scope.startDate, $scope.endDate);

        if ($scope.startDate > $scope.endDate)
            alert("Date incorecte!");

        if($scope.workingDays > $scope.vacationDays) {
            alert("Insuficiente zile de concediu!")
        }

        if ($scope.startDate <= $scope.endDate && $scope.workingDays <= $scope.vacationDays) {
            $http({
                method: 'POST',
                url: '/api/records/',
                data: {
                    'company_id': 1,
                    'user_id': $sessionStorage.id,
                    'created_at': $scope.currentDate.toISOString().slice(0, 19).replace('T', ' '),
                    'period_from': $scope.startDate.toISOString().slice(0, 19).replace('T', ' '),
                    'period_to': $scope.endDate.toISOString().slice(0, 19).replace('T', ' '),
                    'workingDays': $scope.workingDays
                }
            }).then(function successCallback(response) {
                $scope.showDOW();
                $scope.remainingDays = $scope.vacationDays - $scope.workingDays;
                $http({
                    method: 'post',
                    url: '/api/employee/' + $sessionStorage.id,
                    data: {
                        'vacationDays': $scope.remainingDays,
                    }
                }).then(function successCallback(response) {
                }, function errorCallback(response) {
                    console.log("error");
                });

            }, function errorCallback(response) {
                console.log("error");
            });
        }
    }

}]);
