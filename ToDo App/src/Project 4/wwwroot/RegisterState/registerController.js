(function () {
    'use strict';

    angular
        .module('app')
        .controller('registerController', function registerController($scope, $http, $state) {

            $scope.invalidName = false;
            $scope.invalidEmail = false;

            $scope.register = function (userName, email, password) {
                $scope.invalidName = false;
                $scope.invalidEmail = false;
                $http({
                    method: 'POST',
                    url: 'api/register/' + userName + '/' + email + '/' + password
                }).success(function (data) {
                    console.log(data);
                    if (data == 1) $scope.invalidName = true;
                    else if (data == 2) $scope.invalidEmail = true;
                    else $state.go('login');
                }).error(function () {
                    console.log('failed');
                });
            }

        });
})();
