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
var router_1 = require("@angular/router");
var webSocket_service_1 = require("../core/services/webSocket.service");
var rest_service_1 = require("../core/services/rest.service");
var ng2_charts_1 = require("ng2-charts/ng2-charts");
var time_pipe_1 = require("../shared/pipes/time-pipe/time.pipe");
var DashboardComponent = (function () {
    function DashboardComponent(activatedRoute, monitor, restServices, timePipe) {
        var _this = this;
        this.activatedRoute = activatedRoute;
        this.monitor = monitor;
        this.restServices = restServices;
        this.timePipe = timePipe;
        this.size = '8em';
        this.color = '#C20000';
        this.dataList = [{}];
        this.chartsDateList = [];
        this.lineChartData = [
            { data: [0], label: 'Series Distance', lineTension: 0.1 }
        ];
        this.lineChartLabels = [''];
        this.lineChartOptions = {
            responsive: true,
            maintainAspectRatio: false
        };
        this.lineChartColors = [
            {
                backgroundColor: 'rgba(148,159,177,0.2)',
                borderColor: 'rgba(148,159,177,1)',
                pointBackgroundColor: 'rgba(148,159,177,1)',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }
        ];
        this.lineChartLegend = true;
        this.lineChartType = 'line';
        this.title = 'netIOT Connectivity Kit – Sensor to Cloud';
        this.latency = {
            runtime: ''
        };
        this.activatedRoute.data.subscribe(function (params) {
            _this.sensorName = params['sensor'];
        });
        this.monitor.GetInstanceStatus(this.sensorName).subscribe(function (result) {
            console.log('sensor event ' + result);
            console.log(result);
            var parsedJson = JSON.parse(result);
            if (parsedJson.d && parsedJson.d.sensors) {
                parsedJson = parsedJson.d.sensors[0];
                _this.jsonMapping(_this.dataList, parsedJson);
            }
            else {
                _this.latency['responsedTime'] = '';
                _this.latency['runtime'] = '';
                if (parsedJson.d.index >= 0 && parsedJson.d.index <= 65535) {
                    console.log('Sensor to Cloud');
                    _this.latency['led'] = true;
                    setTimeout(function () {
                        _this.latency['led'] = false;
                    }, 2000);
                }
                else {
                    _this.restServices.getCloudantDocs(parsedJson.d.index, _this.sensorName).subscribe(function (restResult) {
                        console.log('Cloud to Sensor ' + restResult);
                        _this.latency['led'] = true;
                        _this.latency['responsedTime'] = new Date(parsedJson.d.timestamp);
                        _this.latency['runtime'] = Math.abs(new Date(_this.latency['responsedTime']).getTime() - new Date(_this.latency['requestedTime']).getTime());
                        setTimeout(function () {
                            _this.latency['led'] = false;
                        }, 2000);
                        console.log(_this.latency);
                    });
                }
            }
        });
        this.setInt();
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.restServices.getLastEvent(this.sensorName).subscribe(function (lastResult) {
            var lastEvent = lastResult['docs'][0]['d'].sensors[0];
            if (_this.dataList && Object.keys(_this.dataList[0]).length === 0) {
                _this.jsonMapping(_this.dataList, lastEvent);
            }
        });
    };
    DashboardComponent.prototype.jsonMapping = function (toJson, fromJson) {
        var _this = this;
        var tempData = {
            'productName': fromJson.productName,
            'vendorName': fromJson.vendorName,
            'serialNumber': fromJson.serialNumber,
            'networkType': fromJson.networkType,
            'connected': fromJson.connectivity.connectedStatus,
            'distance': fromJson.measurements[0].distance,
            'distanceUnit': fromJson.measurements[0].distanceUnit,
            'currentDate': new Date()
        };
        var measurements = {
            'distance': {
                name: 'Distance',
                data: []
            },
            'timestamp': {
                name: 'Event Log',
                data: []
            },
        };
        fromJson.measurements.forEach(function (item) {
            measurements.distance.data.push(parseFloat(item.distance));
            var dateTime = new Date(item.timestamp);
            var legendTime = _this.timePipe.transform(dateTime);
            _this.chartsDateList.push(new Date());
            measurements.timestamp.data.push(legendTime);
        });
        if (toJson.length > 0) {
            toJson.splice(0, 1);
        }
        toJson.push(tempData);
        this.lastEventDate = new Date();
        if (this.chart.datasets[0].data.length > 30) {
            this.chart.datasets[0].data.splice(0, 1);
            this.chart.labels.splice(0, 1);
            this.chart.chart.update();
        }
        this.chart.datasets[0].data.push(measurements.distance.data[0]);
        this.chart.labels.push(measurements.timestamp.data[0]);
        this.chart.chart.update();
    };
    DashboardComponent.prototype.onChangeDistanceMetric = function (eventValue, itemValue) {
        if (eventValue === 'm') {
            itemValue = itemValue / 100;
        }
        else {
            itemValue = itemValue * 100;
        }
        console.log(itemValue);
        console.log(eventValue);
        return itemValue;
    };
    DashboardComponent.prototype.measureLatency = function () {
        var _this = this;
        this.latency['led'] = false;
        this.restServices.demandLatencyCheck('demand-' + this.sensorName).subscribe(function (restResult) {
            _this.latency['requestedTime'] = new Date(restResult['createdAt']);
        });
        return;
    };
    DashboardComponent.prototype.chartClicked = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.chartHovered = function (e) {
        console.log(e);
    };
    DashboardComponent.prototype.setInt = function () {
    };
    return DashboardComponent;
}());
__decorate([
    core_1.ViewChild(ng2_charts_1.BaseChartDirective),
    __metadata("design:type", ng2_charts_1.BaseChartDirective)
], DashboardComponent.prototype, "chart", void 0);
DashboardComponent = __decorate([
    core_1.Component({
        selector: 'app-dashboard',
        providers: [webSocket_service_1.WebSocketService, rest_service_1.RestService, time_pipe_1.TimePipe],
        moduleId: module.id,
        templateUrl: './dashboard-sensor.component.html',
        styleUrls: ['./dashboard-sensor.component.css']
    }),
    __metadata("design:paramtypes", [router_1.ActivatedRoute, webSocket_service_1.WebSocketService, rest_service_1.RestService, time_pipe_1.TimePipe])
], DashboardComponent);
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard-sensor.component.js.map