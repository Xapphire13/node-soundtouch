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
exports.setTimeout = exports.getNowPlaying = exports.setVolume = exports.getVolume = exports.setName = exports.setBass = exports.getBass = exports.getBassCapabilities = exports.selectSource = exports.listSources = exports.setKey = exports.getInfo = void 0;
const http = require("http");
const xml2js = require("xml2js-es6-promise");
var HttpMethod;
(function (HttpMethod) {
    HttpMethod["Get"] = "GET";
    HttpMethod["Post"] = "POST";
})(HttpMethod || (HttpMethod = {}));
let timeout = 0;
function getInfo(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { info } = yield xml2js(yield get(ipAddress, "/info"));
        return {
            components: info.components[0].component.map((component) => ({
                category: component.componentCategory && component.componentCategory[0],
                serialNumber: component.serialNumber && component.serialNumber[0],
                softwareVersion: component.softwareVersion && component.softwareVersion[0]
            })),
            deviceType: info.type[0],
            margeAccountUuid: info.margeAccountUUID[0],
            margeUrl: info.margeURL[0],
            name: info.name[0],
            networkInfo: {
                ipAddress: info.networkInfo[0].ipAddress[0],
                macAddress: info.networkInfo[0].macAddress[0]
            }
        };
    });
}
exports.getInfo = getInfo;
function setKey(ipAddress, key, state) {
    return post(ipAddress, "/key", `<key state="${state}" sender="Gabbo">${key}</key>`);
}
exports.setKey = setKey;
function listSources(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sources } = yield xml2js(yield get(ipAddress, "/sources"));
        return sources.sourceItem ?
            sources.sourceItem.map((sourceItem) => ({
                name: sourceItem.$["source"],
                sourceAccount: sourceItem.$["sourceAccount"],
                status: sourceItem.$["status"]
            })) :
            [];
    });
}
exports.listSources = listSources;
function selectSource(ipAddress, source) {
    return post(ipAddress, "/select", `<ContentItem source="${source.name}" ${source.sourceAccount ? `sourceAccount="${source.sourceAccount}"` : ""}></ContentItem>`);
}
exports.selectSource = selectSource;
function getBassCapabilities(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bassCapabilities } = yield xml2js(yield get(ipAddress, "/bassCapabilities"));
        return {
            bassAvailable: bassCapabilities.bassAvailable[0] === "true",
            bassDefault: +bassCapabilities.bassDefault[0],
            bassMax: +bassCapabilities.bassMax[0],
            bassMin: +bassCapabilities.bassMin[0]
        };
    });
}
exports.getBassCapabilities = getBassCapabilities;
function getBass(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { bass } = yield xml2js(yield get(ipAddress, "/bass"));
        return {
            actual: +bass.actualbass[0],
            target: +bass.targetbass[0]
        };
    });
}
exports.getBass = getBass;
function setBass(ipAddress, value) {
    return post(ipAddress, "/bass", `<bass>${value}</bass>`);
}
exports.setBass = setBass;
function setName(ipAddress, name) {
    return post(ipAddress, "/name", `<name>${name}</name>`);
}
exports.setName = setName;
function getVolume(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { volume } = yield xml2js(yield get(ipAddress, "/volume"));
        return {
            actualVolume: +volume.actualvolume[0],
            muteEnabled: volume.muteenabled && volume.muteenabled[0] === "true",
            targetVolume: +volume.targetvolume[0]
        };
    });
}
exports.getVolume = getVolume;
function setVolume(ipAddress, value) {
    return post(ipAddress, "/volume", `<volume>${value}</volume>`);
}
exports.setVolume = setVolume;
function getNowPlaying(ipAddress) {
    return __awaiter(this, void 0, void 0, function* () {
        const { nowPlaying } = yield xml2js(yield get(ipAddress, "/now_playing"));
        return {
            album: nowPlaying.album && nowPlaying.album[0],
            art: nowPlaying.art && {
                imageStatus: nowPlaying.art[0].$["artImageStatus"],
                url: nowPlaying.art[0][0]
            },
            artist: nowPlaying.artist && nowPlaying.artist[0],
            contentItem: {
                isPresetable: nowPlaying.ContentItem[0].$["isPresetable"],
                location: nowPlaying.ContentItem[0].$["location"],
                name: nowPlaying.ContentItem[0][0],
                source: nowPlaying.ContentItem[0].$["source"],
                sourceAccount: nowPlaying.ContentItem[0].$["sourceAccount"]
            },
            description: nowPlaying.description && nowPlaying.description[0],
            playStatus: nowPlaying.playStatus && nowPlaying.playStatus[0],
            source: nowPlaying.$["source"],
            stationLocation: nowPlaying.stationLocation && nowPlaying.stationLocation[0],
            stationName: nowPlaying.stationName && nowPlaying.stationName[0],
            track: nowPlaying.track && nowPlaying.track[0]
        };
    });
}
exports.getNowPlaying = getNowPlaying;
function setTimeout(milliseconds) {
    timeout = milliseconds;
}
exports.setTimeout = setTimeout;
function get(host, path) {
    return makeRequest(HttpMethod.Get, host, path);
}
function post(host, path, data) {
    return __awaiter(this, void 0, void 0, function* () {
        yield makeRequest(HttpMethod.Post, host, path, data);
    });
}
function makeRequest(method, host, path, data) {
    return new Promise((resolve, reject) => {
        const req = http.request({
            method: method,
            port: "8090",
            host: host,
            path,
            headers: {
                "Content-Type": "application/xml"
            },
            timeout
        }, res => {
            res.on("data", (result) => {
                res.statusCode === 200 ?
                    resolve(result) :
                    reject({
                        statusCode: res.statusCode,
                        message: res.statusMessage
                    });
            });
        });
        req.on("timeout", () => req.abort());
        req.on("error", err => reject(err));
        if (method === HttpMethod.Post && data) {
            req.write(data);
        }
        req.end();
    });
}
