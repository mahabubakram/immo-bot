"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var Rx_1 = require("rxjs/Rx");
var WebSocketService = (function () {
    function WebSocketService() {
    }
    WebSocketService.prototype.sendMessage = function (text) {
        this.websocket.send(text);
    };
    WebSocketService.prototype.GetInstanceStatus = function (sensorName) {
        var _this = this;
        this.webSocketUrl = "wss://mw-testiot-app.eu-gb.mybluemix.net/ws/" + sensorName;
        this.websocket = new WebSocket(this.webSocketUrl);
        this.websocket.onopen = function (evt) {
            console.log('websocket is open');
        };
        return Rx_1.Observable.create(function (observer) {
            _this.websocket.onmessage = function (evt) {
                observer.next(evt);
            };
        })
            .map(function (res) { return res.data; })
            .share();
    };
    WebSocketService.prototype.GetSensor2InstanceStatus = function () {
        var _this = this;
        this.webSocketUrl = "wss://mw-testiot-app.eu-gb.mybluemix.net/ws/sensor2";
        this.websocket = new WebSocket(this.webSocketUrl);
        this.websocket.onopen = function (evt) {
            console.log('websocket is open');
        };
        return Rx_1.Observable.create(function (observer) {
            _this.websocket.onmessage = function (evt) {
                observer.next(evt);
            };
        })
            .map(function (res) { return res.data; })
            .share();
    };
    return WebSocketService;
}());
WebSocketService = __decorate([
    core_1.Injectable()
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=webSocket.service.js.map