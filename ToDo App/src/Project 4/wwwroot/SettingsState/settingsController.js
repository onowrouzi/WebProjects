(function () {
    'use strict';

    angular
        .module('app')
        .controller('settingsController', function settingsController($scope, $http, $q, $state) {

            $scope.changed = false;
            $scope.days = 0;
            $scope.hours = 0;

            getToDos().then(
                function (data) {
                    $scope.toDo = data;
                    $scope.currentWarning = "Current Warning Time set to " + $scope.toDo[0].warningDays + " days " + $scope.toDo[0].warningHours + " hours.";
                });

            $scope.update = function () {
                if ($scope.days > 0 || $scope.hours > 0) {
                    angular.forEach($scope.toDo, function (toDo) {
                        toDo.WarningDays = $scope.days;
                        toDo.WarningHours = $scope.hours;
                        $http({
                            method: 'PUT',
                            url: 'api/toDo/' + toDo.id,
                            data: toDo,
                        }).success(function() {
                            console.log('success');
                        });
                    });
                    $scope.changed = true;
                }
            }

            $scope.return = function() {
                $state.go('toDo');
            }

            function getToDos() {
                var deferred = $q.defer();
                $http.get("api/toDo").then(
                    function handleSuccess(response) {
                        console.log('success');
                        deferred.resolve(response.data);
                    },
                    function handleError(response) {
                        console.log('failure');
                    }
                );
                return deferred.promise;
            }
            
        });
})();
