(function () {
    'use strict';
    
//this is where the home-route will go
angular.module('app', ['ui.router', 'ui.bootstrap', 'angularMoment', 'ngCookies', 'luegg.directives'])
	//declare authentication global variable.
	.run(function($rootScope) {
		$rootScope.auth = false;
	})
	
	.factory('socket', ['$rootScope', function($rootScope){
		var socket = io.connect();
		
		return {
			on: function(evt, callback){
				socket.on(evt, callback);
			},
			emit: function(evt, data){
				socket.emit(evt, data);
			}
		};
	}]);
	//Routes defined in router.js
})();