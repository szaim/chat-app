(function (app) {
   app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
       $locationProvider.html5Mode(true);

       $routeProvider.when('/', {
           templateUrl: 'templates/main.html',
           controller: 'mainController',
           controllerAs: 'ctrl'
       });

       $routeProvider.when('/room', {
           templateUrl: 'templates/room.html',
           controller: 'roomController',
           controllerAs: 'ctrl'
       });
   }]);
} (angular.module('chatroom', ['ngRoute', 'btford.socket-io'])));