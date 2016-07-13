(function () {
    'use strict';

    angular
        .module('app')
        .config(function ($stateProvider, $urlRouterProvider) {
            //
            // For any unmatched url, redirect to /state1
            $urlRouterProvider.otherwise("/");
            //
            // Now set up the states
            $stateProvider
                .state('login', {
                    url: "/",
                    templateUrl: "LoginState/loginState.html",
                    controller: 'loginController'
                })
                .state('register', {
                    url: "/register",
                    templateUrl: "RegisterState/registerState.html",
                    controller: 'registerController'
                })
              .state('toDo', {
                  url: "/toDo",
                  templateUrl: "ToDoState/toDoState.html",
                  controller: 'toDoController'
              })
              .state('settings', {
                  url: "/settings",
                  templateUrl: "SettingsState/settingsState.html",
                  controller: 'settingsController'
              });
        });
})();
