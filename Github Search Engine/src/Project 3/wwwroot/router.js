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
          .state('default', {
              url: "/",
              templateUrl: "DefaultState/defaultState.html",
              controller: 'defaultController'
          })
          .state('user', {
              url: "/user/{userName}",
              templateUrl: "UserState/userState.html",
              controller: 'userController',
              resolve: {
                  getUserService: 'userService', 
                  userData: function (getUserService, $stateParams) {
                      return getUserService.getUser($stateParams.userName);
                  }
              }
          })
          .state('repo', {
              url: "/repos/{repoOwner}/{repoName}",
              templateUrl: "RepoState/repoState.html",
              controller: 'repoController',
              resolve: {
                  getRepoService: 'repoService',
                  repoData: function (getRepoService, $stateParams) {
                      return getRepoService.getRepo($stateParams.repoName, $stateParams.repoOwner);
                  }
              }
          });
    });
})();
