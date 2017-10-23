"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var Rx_1 = require("rxjs/Rx");
require("rxjs/add/operator/toPromise");
var RestService = (function () {
    function RestService(http) {
        this.http = http;
        this.restHost = '';
        this.baseCloudantUrl = 'api/cloud';
        this.bluemixHost = 'https://mw-testiot-app.eu-gb.mybluemix.net/';
        this.bluemixUrl = 'demand';
    }
    RestService.prototype.getCloudantDocs = function (indexToSearch, sensorType) {
        var params = new http_1.URLSearchParams();
        params.set('index', indexToSearch);
        params.set('sensor', sensorType);
        return this.http.get((this.restHost + this.baseCloudantUrl), { search: params })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype.demandLatencyCheck = function (sensorType) {
        this.bluemixUrl = sensorType;
        return this.http.post(this.bluemixHost + this.bluemixUrl, {})
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype.getLastEvent = function (sensorType) {
        var params = new http_1.URLSearchParams();
        params.set('sensor', sensorType);
        this.baseCloudantUrl = 'api/last-event';
        return this.http.get((this.restHost + this.baseCloudantUrl), { search: params })
            .map(function (res) { return res.json(); })
            .catch(function (error) { return Rx_1.Observable.throw(error.json().error || 'Server error'); });
    };
    RestService.prototype._handleError = function (error) {
        console.error('An error occurred', error);
        return Promise.reject(error.message || error);
    };
    return RestService;
}());
RestService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], RestService);
exports.RestService = RestService;
//# sourceMappingURL=rest.service.js.map