"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Device = void 0;
const api = require("./api");
const types_1 = require("./types");
const sleep = require("sleep-promise");
class Device {
    constructor(ipAddress) {
        this.ipAddress = ipAddress;
    }
    static create(ipAddress) {
        return __awaiter(this, void 0, void 0, function* () {
            const device = new Device(ipAddress);
            const deviceInfo = yield device.getInfo();
            device.deviceType = deviceInfo.deviceType;
            device.name = deviceInfo.name;
            device.macAddress = deviceInfo.networkInfo.macAddress;
            return device;
        });
    }
    getInfo() {
        return api.getInfo(this.ipAddress);
    }
    pressKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.setKey(this.ipAddress, key, types_1.KeyState.Press);
            yield api.setKey(this.ipAddress, key, types_1.KeyState.Release);
        });
    }
    holdKey(key) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.setKey(this.ipAddress, key, types_1.KeyState.Press);
            yield sleep(5000);
            yield api.setKey(this.ipAddress, key, types_1.KeyState.Release);
        });
    }
    listSources() {
        return api.listSources(this.ipAddress);
    }
    selectSource(source) {
        return api.selectSource(this.ipAddress, source);
    }
    getBassCapabilities() {
        return api.getBassCapabilities(this.ipAddress);
    }
    getBass() {
        return api.getBass(this.ipAddress);
    }
    setBass(value) {
        return api.setBass(this.ipAddress, value);
    }
    setName(name) {
        return __awaiter(this, void 0, void 0, function* () {
            yield api.setName(this.ipAddress, name);
            this.name = name;
        });
    }
    getVolume() {
        return api.getVolume(this.ipAddress);
    }
    setVolume(value) {
        return api.setVolume(this.ipAddress, value);
    }
    getNowPlaying() {
        return api.getNowPlaying(this.ipAddress);
    }
    isPoweredOn() {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield this.getNowPlaying()).source !== types_1.Source.Standby;
        });
    }
    powerOn() {
        return __awaiter(this, void 0, void 0, function* () {
            if (!(yield this.isPoweredOn())) {
                yield this.pressKey(types_1.Key.Power);
            }
        });
    }
    powerOff() {
        return __awaiter(this, void 0, void 0, function* () {
            if (yield this.isPoweredOn()) {
                yield this.pressKey(types_1.Key.Power);
            }
        });
    }
}
exports.Device = Device;
