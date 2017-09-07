import * as http from "http";
import * as xml2js from "xml2js";

import {Bass, BassCapability, Key, KeyState, Source} from "./types";
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

export async function getBassCapabilities(device: Device): Promise<BassCapability> {
  const bassCapability = await makeRequest(HttpMethod.Get, device.ipAddress, "/bassCapabilities");

  return new Promise<BassCapability>((res, rej) => xml2js.parseString(bassCapability, (err, {bassCapabilities}) => {
    err ? rej(err) : res(<BassCapability>{
      bassAvailable: bassCapabilities.bassAvailable[0] === "true",
      bassDefault: +bassCapabilities.bassDefault[0],
      bassMax: +bassCapabilities.bassMax[0],
      bassMin: +bassCapabilities.bassMin[0]
    })
  }));
}

export async function getBass(device: Device): Promise<Bass> {
  const bass = await makeRequest(HttpMethod.Get, device.ipAddress, "/bass");

  return new Promise<Bass>((res, rej) => xml2js.parseString(bass, (err, {bass}) => {
    err ? rej(err) : res(<Bass>{
      actual: +bass.actualbass[0],
      target: +bass.targetbass[0]
    });
  }));
}

export async function setBass(device: Device, value: number): Promise<void> {
  await makeRequest(HttpMethod.Post, device.ipAddress, "/bass", `<bass>${value}</bass>`);
}

export async function setName(device: Device, name: string): Promise<void> {
  await makeRequest(HttpMethod.Post, device.ipAddress, "/name", `<name>${name}</name>`);
}
