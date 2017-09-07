import * as http from "http";
import * as xml2js from "xml2js";

import {Key, KeyState, Source} from "./types";
import {Component, Device, DeviceInfo} from "./Device";

enum HttpMethod {
  Get = "GET",
  Post = "POST"
}

function makeRequest(method: HttpMethod, host: string, path: string, data?: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const req = http.request({
      method: method,
      port: "8090",
      host: host,
      path,
      headers: {
        "Content-Type": "application/xml"
      }
    }, res => {
      res.on("data", (result: string) => {
        res.statusCode === 200 ?
          resolve(result) :
          reject({
            statusCode: res.statusCode,
            message: res.statusMessage
          });
      });
    });

    req.on("error", err => reject(err));

    if (method === HttpMethod.Post && data) {
      req.write(data);
    }
    req.end();
  });
}

export async function getInfo(device: Device): Promise<DeviceInfo> {
  const info = await makeRequest(HttpMethod.Get, device.ipAddress, "/info");

  return new Promise<DeviceInfo>((res, rej) => xml2js.parseString(info, (err, {info}) => {
    err ? rej(err) : res(<DeviceInfo>{
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
  }));
}

export async function setKey(device: Device, key: Key, state: KeyState): Promise<void> {
  await makeRequest(HttpMethod.Post, device.ipAddress, "/key", `<key state="${state}" sender="Gabbo">${key}</key>`);
}

export async function listSources(device: Device): Promise<Source[]> {
  const sources = await makeRequest(HttpMethod.Get, device.ipAddress, "/sources");

  return new Promise<Source[]>((res, rej) => xml2js.parseString(sources, (err, {sources}) => {
    err ? rej(err) : res(sources.sourceItem ?
      sources.sourceItem.map((sourceItem: any) => (<Source>{
        name: sourceItem.$.source,
        sourceAccount: sourceItem.$.sourceAccount,
        status: sourceItem.$.status
      })) :
      []
    );
  }));
}

export async function selectSource(device: Device, source: Source): Promise<void> {
  await makeRequest(HttpMethod.Post, device.ipAddress, "/select", `<ContentItem source="${source.name}" ${source.sourceAccount ? `sourceAccount="${source.sourceAccount}"` : ""}></ContentItem>`);
}
