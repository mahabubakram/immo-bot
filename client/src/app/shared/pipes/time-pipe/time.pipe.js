"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var TimePipe = (function () {
    function TimePipe() {
    }
    TimePipe.prototype.transform = function (value) {
        if (!value)
            return;
        var hh = (value.getHours() < 10) ? '0' + value.getHours() : value.getHours();
        var mm = (value.getMinutes() < 10) ? '0' + value.getMinutes() : value.getMinutes();
        var ss = (value.getSeconds() < 10) ? '0' + value.getSeconds() : value.getSeconds();
        var ms = value.getMilliseconds().toString();
        return hh + ":" + mm + ":" + ss + "." + ms.substring(0, 1);
    };
    return TimePipe;
}());
TimePipe = __decorate([
    core_1.Pipe({ name: 'time' })
], TimePipe);
exports.TimePipe = TimePipe;
//# sourceMappingURL=time.pipe.js.map