(function () {
    'use strict';

    angular
        .module('app')
        .factory('userService', function userService($http, $q) {
            return {
                getUser: function (userName) {
                    var deferred = $q.defer();
                    $http.get("https://api.github.com/users/" + userName).then(
                        function handleSuccess(response) {
                            console.log('Got user promise data!');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve user promise data.');
                        });
                    return deferred.promise;
                },

                getUserRepos: function (user) {
                    var deferred = $q.defer();
                    $http.get("https://api.github.com/users/" + user + "/repos").then(
                        function handleSuccess(response) {
                            console.log('Got user repo promise data!');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve user repo promise data.');
                        });
                    return deferred.promise;
                },

                getFollowers: function (user) {
                    var deferred = $q.defer();
                    $http.get("https://api.github.com/users/" + user + "/followers").then(
                        function handleSuccess(response) {
                            console.log('Got user follower promise data!');
                            deferred.resolve(response.data);
                        },
                        function handleError(response) {
                            console.log('Could not retrieve user follower promise data.');
                        });
                    return deferred.promise;
                }
            };
        });
})();