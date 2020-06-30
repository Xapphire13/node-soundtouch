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
exports.findDevice = exports.searchForDevices = void 0;
const Device_1 = require("./Device");
const node_ssdp_1 = require("node-ssdp");
const sleep = require("sleep-promise");
const ssdpId = "urn:schemas-upnp-org:device:MediaRenderer:1";
function searchForDevices(timeout = 10000) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new node_ssdp_1.Client();
        const foundDevices = [];
        client.on("response", (_headers, _status, info) => __awaiter(this, void 0, void 0, function* () {
            try {
                foundDevices.push(yield Device_1.Device.create(info.address));
            }
            catch (err) { } // Swallow, not all devices that respond are SoundTouch devices
        }));
        yield client.search(ssdpId);
        yield sleep(timeout);
        client.stop();
        return foundDevices;
    });
}
exports.searchForDevices = searchForDevices;
function findDevice(name, timeout = 30000) {
    return __awaiter(this, void 0, void 0, function* () {
        const client = new node_ssdp_1.Client();
        const devicePromise = new Promise((res) => {
            client.on("response", (_headers, _status, info) => __awaiter(this, void 0, void 0, function* () {
                try {
                    const device = yield Device_1.Device.create(info.address);
                    if ((new RegExp(`^${device.name}\$`, "i")).test(name)) {
                        res(device);
                    }
                }
                catch (err) { } // Swallow, not all devices that respond are SoundTouch devices
            }));
        });
        yield client.search(ssdpId);
        const device = yield Promise.race([
            devicePromise,
            sleep(timeout)
        ]);
        client.stop();
        return device || null;
    });
}
exports.findDevice = findDevice;
