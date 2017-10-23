"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var platform_browser_1 = require("@angular/platform-browser");
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var router_1 = require("@angular/router");
var store_1 = require("@ngrx/store");
var dashboard_sensor_module_1 = require("./dashboard-sensor/dashboard-sensor.module");
var shared_module_1 = require("./shared/shared.module");
var core_module_1 = require("./core/core.module");
var store_devtools_1 = require("@ngrx/store-devtools");
var app_routing_module_1 = require("./app-routing.module");
var page_not_found_module_1 = require("./page-not-found/page-not-found.module");
var app_component_1 = require("./app.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        declarations: [
            app_component_1.AppComponent
        ],
        imports: [
            router_1.RouterModule,
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            dashboard_sensor_module_1.DashboardSensorModule,
            shared_module_1.SharedModule,
            core_module_1.CoreModule,
            page_not_found_module_1.PageNotFoundModule,
            app_routing_module_1.AppRoutingModule,
            store_1.StoreModule.provideStore({}),
            store_devtools_1.StoreDevtoolsModule.instrumentOnlyWithExtension({
                maxAge: 5
            })
        ],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map