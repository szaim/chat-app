(function (app) {
   app.config(['$routeProvider', function ($routeProvider) {
       $routeProvider.when('/', {
           templateUrl: 'templates/main.html',
           controller: 'mainController',
           controllerAs: 'ctrl'
       });

   }]);
} (angular.module('chatroom', ['ngRoute', 'btford.socket-io'])));