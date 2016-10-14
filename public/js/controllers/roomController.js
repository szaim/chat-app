"use strict";
(function (app) {
    app.controller('roomController', ['$socket', '$routeParams', '$timeout', function ($socket, $routeParams, $timeout) {
        this.username = $routeParams.user;
        this.messages = [];
        this.typer = '';
        this.message = '';

        this.users = [];

        $socket.on("get users", function (users) {
            this.users = users;
        }.bind(this));

        $socket.on("new message", function (message) {
            this.messages.push(message);
        }.bind(this));

        var timeoutPromise = null;
        $socket.on("notify user", function(user) {
            user = user.user;
            if (this.username !== user) {
                this.typer = user;

                $timeout.cancel(timeoutPromise);
                timeoutPromise = $timeout(function () {
                    this.typer = '';
                }.bind(this), 1000)
            }
        }.bind(this));
        this.announceUserTyping = function announceUserTyping() {
            $socket.emit("notify user");
        };

        this.sendMessage = function sendMessage($event) {
            $event.preventDefault();
            $socket.emit("send message", this.message)
            this.message = '';
        };

        $socket.emit("new user", this.username);

    }]);
} (angular.module('chatroom')));