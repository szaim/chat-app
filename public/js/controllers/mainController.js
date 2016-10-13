(function (app) {
    app.controller('mainController', ['$socket', '$location', function ($socket, $location) {
        this.user = '';
        this.login = function (event) {
            event.preventDefault();
            $socket.emit("new user", this.user);
            $location.url('/room')
        }
    }]);
} (angular.module('chatroom')));