"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DiscoveryService = exports.Api = void 0;
const api = require("./api");
const ds = require("./discoveryService");
var Api;
(function (Api) {
    Api.getBass = api.getBass, Api.getBassCapabilities = api.getBassCapabilities, Api.getInfo = api.getInfo, Api.getNowPlaying = api.getNowPlaying, Api.getVolume = api.getVolume, Api.listSources = api.listSources, Api.selectSource = api.selectSource, Api.setBass = api.setBass, Api.setKey = api.setKey, Api.setName = api.setName, Api.setVolume = api.setVolume, Api.setTimeout = api.setTimeout;
})(Api = exports.Api || (exports.Api = {}));
var DiscoveryService;
(function (DiscoveryService) {
    DiscoveryService.findDevice = ds.findDevice, DiscoveryService.searchForDevices = ds.searchForDevices;
})(DiscoveryService = exports.DiscoveryService || (exports.DiscoveryService = {}));
var Device_1 = require("./Device");
Object.defineProperty(exports, "Device", { enumerable: true, get: function () { return Device_1.Device; } });
var types_1 = require("./types");
Object.defineProperty(exports, "ArtStatus", { enumerable: true, get: function () { return types_1.ArtStatus; } });
Object.defineProperty(exports, "Key", { enumerable: true, get: function () { return types_1.Key; } });
Object.defineProperty(exports, "KeyState", { enumerable: true, get: function () { return types_1.KeyState; } });
Object.defineProperty(exports, "PlayStatus", { enumerable: true, get: function () { return types_1.PlayStatus; } });
Object.defineProperty(exports, "Source", { enumerable: true, get: function () { return types_1.Source; } });
Object.defineProperty(exports, "SourceStatus", { enumerable: true, get: function () { return types_1.SourceStatus; } });
