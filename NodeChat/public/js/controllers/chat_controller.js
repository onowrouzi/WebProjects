(function () {
    'use strict';

    angular
        .module('app')
        .controller('chat_controller', function chat_controller($scope, socket, $log, $cookieStore) {
			
			$scope.messages = [];
			$scope.currentUser = {};
			$scope.currentUser.username = $cookieStore.get('username');
			
			socket.emit('enter user', $scope.currentUser.username);
			
			socket.on('get users', function(data){
				$scope.users = data;
				console.log(data);
				$scope.$apply();
			});
			
			socket.emit('get messages');
			
			socket.on('clear messages', function(){
				$scope.messages = [];
			});
			
			socket.on('receive messages', function(data){
				$scope.messages.push(data);
				$scope.$apply();
			});
			
			$scope.send = function(){
				if ($scope.currentUser.message != ""){
					$scope.currentUser.time = new Date();
					$scope.currentUser.time = moment.utc($scope.currentUser.time).format("MM/DD/YYYY HH:mm a");
					socket.emit('send message', $scope.currentUser);
					socket.emit('get messages');
					$scope.currentUser.message = "";
				}
			};
			
			$scope.logout = function(){
				$cookieStore.put('auth', false);
				socket.emit('log out', {user: $scope.currentUser.username});
				socket.emit('disconnect');
			};
				
        });
})();