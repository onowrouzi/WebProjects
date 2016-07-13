(function () {
    'use strict';

    angular
        .module('app')
        .controller('userController', function userController($scope, $http, $q, userData, getUserService) {
            $scope.userData = userData;

            $scope.updateUserData = function () {
                getUserService.getUserRepos($scope.userData.login).then(
                    function (data) {
                        console.log('Got user repos data.');
                        $scope.repos = data;
                    });
                getUserService.getFollowers($scope.userData.login).then(
                    function (data) {
                        console.log('Got user followers data.');
                        $scope.followers = data;
                    });
            };

            $scope.updateUserData();
        });
})();
