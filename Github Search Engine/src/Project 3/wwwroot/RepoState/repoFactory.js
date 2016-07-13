(function () {
    'use strict';

    angular
        .module('app')
        .factory('repoService', function repoService($http, $q) {
            return {
                getRepo: function(repoName, repoOwner) {
                    var deferred = $q.defer();
                    console.log(repoName);
                    $http.get("https://api.github.com/repos/" + repoOwner + "/" + repoName).then(
                        function handleSuccess(response) {
                            console.log('Got repo data promise.');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve repo data.');
                        });
                    return deferred.promise;
                }, 

                getCommits: function (repo, user) {
                    var deferred = $q.defer();
                    $http.get("https://api.github.com/repos/" + user + "/" + repo + "/commits").then(
                        function handleSuccess(response) {
                            console.log('Got repo commits promise.');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve repo commits promise.');
                        });
                    return deferred.promise;
                },

                getIssues: function (repo, user) {
                    var deferred = $q.defer();
                    $http.get("https://api.github.com/repos/" + user + "/" + repo + "/issues").then(
                        function handleSuccess(response) {
                            console.log('Got repo issues promise.');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve repo issues promise.');
                        });
                    return deferred.promise;
                }
        };
    });
})();