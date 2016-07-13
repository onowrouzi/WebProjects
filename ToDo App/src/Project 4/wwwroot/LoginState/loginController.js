(function () {
    'use strict';

    angular
        .module('app')
        .controller('loginController', function loginController($scope, $http, $q, $state, $window) {

            $scope.authentication = {
                UserName: '',
                Password: ''
            }

            $scope.error = false;

            $scope.register = function() {
                $state.go('register');
            }

            $scope.authenticate = function(user, password) {
                $scope.authentication.UserName = user;
                $scope.authentication.Password = password;
                $http({
                    method: 'POST',
                    url: 'api/login',
                    data: $scope.authentication
                }).success(function() {
                    console.log('success');
                    $state.go('toDo');
                }).error(function() {
                    $scope.error = true;
                });
            }

        });
})();
