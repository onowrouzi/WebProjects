(function () {
    'use strict';

    angular
        .module('app')
        .controller('defaultController', function defaultController($scope, $http, $log, $q, $state) {

            $scope.notFound = false;
            $scope.search = {
                type: 1,
                value: ""
            };
            $scope.currentPage = 1;

            $scope.sendUserData = function (userName) {
                $state.go('user', { userName: userName });
            };

            $scope.sendRepoData = function (repoName, repoOwner) {
                $state.go('repo', { repoName: repoName, repoOwner: repoOwner });
            };

            $scope.updateData = function() {
                if ($scope.search.type == 1) {
                    getUsers().then(
                        function (data) {
                            $scope.users = data;
                            console.log('Got list of users.');
                            if (data.total_count == "") $scope.notFound = true;
                            else $scope.notFound = false;
                        });
                } else {
                    getRepos().then(
                        function (data) {
                            $scope.repos = data;
                            console.log('Got list of repos.');
                            if (data.total_count == "") $scope.notFound = true;
                            else $scope.notFound = false;
                        });
                }
            };

            function getUsers() {
                delete $scope.repos;
                var deferred = $q.defer();
                $http.get("https://api.github.com/search/users?q=" + $scope.search.value).then(
                    function handleSuccess(response) {
                        console.log('Got promise list of users.');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('Promise list of users failed.');
                    });
                return deferred.promise;
            };

            function getRepos() {
                delete $scope.users;
                var deferred = $q.defer();
                $http.get("https://api.github.com/search/repositories?q=" + $scope.search.value).then(
                    function handleSuccess(response) {
                        console.log('Got promise list of repos.');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('Promise list of repos failed.');
                    });
                return deferred.promise;
            };

        });

})();
