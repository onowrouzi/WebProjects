(function () {
    'use strict';

    angular
        .module('app')
        .controller('toDoController', function toDoController($scope, $http, $q, $state, $window, $interval) {

            getToDos().then(
                function(data) {
                    $scope.toDos = data;
                    initToDos();
                });

            $scope.activeToDos = [];
            $scope.completedToDos = [];

            $scope.ToDo = {
                Name: "Sample Task",
                Description: "Sample Description...",
                DueDate: $scope.today,
                Tag: "Personal",
                State: "Active"
            }

            $scope.reverse = false;
            $scope.predicate = 'name';
            $scope.order = function(predicate) {
                if ($scope.predicate === predicate) {
                    $scope.reverse = !$scope.reverse;
                }
                $scope.predicate = predicate;
            }

            $scope.settings = function() {
                $state.go('settings');
            }

            function tick() {
                $scope.today = moment().utcOffset(-300).format('MM/DD/YY hh:mm:ss a');
            }

            tick();
            $interval(tick, 1000);

            $scope.submit = function() {
                if ($scope.toDos.length > 0) {
                    $scope.ToDo.WarningDays = $scope.toDos[0].warningDays;
                    $scope.ToDo.WarningHours = $scope.toDos[0].warningHours;
                } else {
                    $scope.ToDo.WarningDays = 2;
                    $scope.ToDo.WarningHours = 0;
                }
                $http({
                    method: 'POST',
                    url: 'api/toDo',
                    data: $scope.ToDo,
                }).success(function() {
                    console.log('success');
                    $window.location.reload();
                });
            }

            $scope.delete = function(id) {
                $http.delete('api/toDo/' + id)
                    .success(function() {
                        console.log('success');
                        $window.location.reload();
                    });
            }

            $scope.update = function(toDo, id) {
                if (!toDo.editable) {
                    toDo.editable = true;
                    $scope.ToDo.Name = toDo.name;
                    $scope.ToDo.Description = toDo.description;
                    $scope.ToDo.DueDate = toDo.dueDate;
                    $scope.ToDo.Tags = toDo.tags.join();
                    $scope.ToDo.State = toDo.state;
                } else {
                    if ($scope.ToDo.DueDate > moment("0001-01-01")) {
                        $scope.ToDo.DueDate = moment($scope.ToDo.DueDate).toDate();
                    } else {
                        $scope.ToDo.DueDate = moment(toDo.dueDate);
                    }
                    $scope.ToDo.WarningDays = $scope.toDos[0].warningDays;
                    $scope.ToDo.WarningHours = $scope.toDos[0].warningHours;
                    $http({
                        method: 'PUT',
                        url: 'api/toDo/' + id,
                        data: $scope.ToDo,
                    }).success(function() {
                        console.log('success');
                        $window.location.reload();
                    });
                }
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

            function initToDos() {
                angular.forEach($scope.toDos, function (toDo) {
                    if (toDo.state === "Active") {
                        $scope.activeToDos = $scope.activeToDos.concat(toDo);
                    } else if (toDo.state === "Completed") {
                        $scope.completedToDos = $scope.completedToDos.concat(toDo);
                    }
                    toDo.tags = toDo.tags.split(',');
                });
                angular.forEach($scope.activeToDos, function (toDo) {
                    toDo.editable = false;
                    toDo.dueDate = moment(toDo.dueDate).utc().format('MM/DD/YY hh:mm a');
                    toDo.warningDate = moment(toDo.dueDate).subtract(toDo.warningDays, 'd').subtract(toDo.warningHours, 'h');
                    toDo.warningDate = moment(toDo.warningDate).utc().format('MM/DD/YY hh:mm a');
                    if (toDo.dueDate < $scope.today && toDo.state) {
                        toDo.passedDue = true;
                    }
                    else if ($scope.today >= toDo.warningDate) {
                        toDo.warning = true;
                    } 
                });
            }
        });
})();
