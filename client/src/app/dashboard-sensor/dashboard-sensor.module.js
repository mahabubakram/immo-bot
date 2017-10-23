"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var shared_module_1 = require("../shared/shared.module");
var dashboard_sensor_component_1 = require("./dashboard-sensor.component");
var webSocket_service_1 = require("../core/services/webSocket.service");
var rest_service_1 = require("../core/services/rest.service");
var ng2_charts_1 = require("ng2-charts");
var time_pipe_1 = require("../shared/pipes/time-pipe/time.pipe");
var DashboardSensorModule = (function () {
    function DashboardSensorModule() {
    }
    return DashboardSensorModule;
}());
DashboardSensorModule = __decorate([
    core_1.NgModule({
        declarations: [
            dashboard_sensor_component_1.DashboardComponent, time_pipe_1.TimePipe
        ],
        imports: [
            shared_module_1.SharedModule,
            ng2_charts_1.ChartsModule
        ],
        exports: [dashboard_sensor_component_1.DashboardComponent, time_pipe_1.TimePipe],
        providers: [webSocket_service_1.WebSocketService, rest_service_1.RestService]
    })
], DashboardSensorModule);
exports.DashboardSensorModule = DashboardSensorModule;
//# sourceMappingURL=dashboard-sensor.module.js.map