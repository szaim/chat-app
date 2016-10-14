(function (app) {
    app.controller('mainController', ['$socket', '$location', function ($socket, $location) {
        this.user = '';
        this.login = function (event) {
            event.preventDefault();
            $location.url('/room?user=' + this.user)
        }
    }]);
} (angular.module('chatroom')));