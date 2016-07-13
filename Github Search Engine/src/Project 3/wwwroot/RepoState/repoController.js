(function () {
    'use strict';

    angular
        .module('app')
        .controller('repoController', function repoController($scope, $http, $log, $q, repoData, getRepoService) {
            $scope.repoData = repoData;

            $scope.updateRepoData = function (repo, user) {
                getRepoService.getCommits(repo, user).then(
                    function (data) {
                        console.log('Got repo commits data.');
                        $scope.commits = data;
                    });
                getRepoService.getIssues(repo, user).then(
                    function (data) {
                        console.log('Got repo issues data.');
                        $scope.issues = data;
                    });
            };

            $scope.updateRepoData(repoData.name,repoData.owner.login);
        });
})();
