(function () {
    'use strict';

    angular.module('app', [
            // Angular modules 
            'ui.bootstrap',
            // Custom modules 
            'ui.router'
            // 3rd Party Modules
        ])

        //   .controller('appController', function($rootScope) {
        //           $rootScope.$on("$stateChangeError", console.log.bind(console));
        //       });
        .filter('startFrom', function() {
            return function (data, start) {
                if (!data || !data.length) { return; }
                return data.slice(start);
            }
        });

})();