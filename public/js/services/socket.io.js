(function (app) {
    app.factory('$socket', function (socketFactory) {
        return socketFactory();
    });
} (angular.module('chatroom')));