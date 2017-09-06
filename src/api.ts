import * as http from "http";
import * as xml2js from "xml2js";

import {Key, KeyState} from "./types";
import {Component, Device, DeviceInfo} from "./Device";

export function getInfo(device: Device): Promise<DeviceInfo> {
  return new Promise((resolve, reject) => {
    const req = http.get({
      port: "8090",
      host: device.ipAddress,
      path: "/info",
      headers: {
        "Content-Type": "application/xml"
      }
    }, res => {
      res.on("data", (result: string) => {
        if (res.statusCode === 200) {
          xml2js.parseString(result, (err, {info}) => {
            err ? reject(err) : resolve(<DeviceInfo>{
              components: info.components[0].component.map((component: any) => (<Component>{
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
            });
          });
        } else {
          reject({
            statusCode: res.statusCode,
            message: res.statusMessage
          });
        }
      });
    });

    req.on("error", err => reject(err));
  });
}

export function setKey(device: Device, key: Key, state: KeyState): Promise<void> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      method: "POST",
      port: "8090",
      host: device.ipAddress,
      path: "/key",
      headers: {
        "Content-Type": "application/xml"
      }
    }, res => {
      res.on("data", () => {
        res.statusCode === 200 ?
          resolve() :
          reject({
            statusCode: res.statusCode,
            message: res.statusMessage
          });
      });
    });

    req.on("error", err => reject(err));

    req.write(`<key state="${state}" sender="Gabbo">${key}</key>`);
    req.end();
  });
}
