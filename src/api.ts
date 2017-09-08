import * as http from "http";
const xml2js = require("xml2js-es6-promise");

import {Bass, BassCapability, Key, KeyState, Source, Volume} from "./types";
import {Component, DeviceInfo} from "./Device";

enum HttpMethod {
  Get = "GET",
  Post = "POST"
}

export async function getInfo(ipAddress: string): Promise<DeviceInfo> {
  const {info} = await xml2js(await get(ipAddress, "/info"));

  return {
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
  };
}

export function setKey(ipAddress: string, key: Key, state: KeyState): Promise<void> {
  return post(ipAddress, "/key", `<key state="${state}" sender="Gabbo">${key}</key>`);
}

export async function listSources(ipAddress: string): Promise<Source[]> {
  const {sources} = await xml2js(await get(ipAddress, "/sources"));

  return sources.sourceItem ?
    sources.sourceItem.map((sourceItem: any) => (<Source>{
      name: sourceItem.$.source,
      sourceAccount: sourceItem.$.sourceAccount,
      status: sourceItem.$.status
    })) :
    [];
}

export function selectSource(ipAddress: string, source: Source): Promise<void> {
  return post(ipAddress, "/select", `<ContentItem source="${source.name}" ${source.sourceAccount ? `sourceAccount="${source.sourceAccount}"` : ""}></ContentItem>`);
}

export async function getBassCapabilities(ipAddress: string): Promise<BassCapability> {
  const {bassCapabilities} = await xml2js(await get(ipAddress, "/bassCapabilities"));

  return {
    bassAvailable: bassCapabilities.bassAvailable[0] === "true",
    bassDefault: +bassCapabilities.bassDefault[0],
    bassMax: +bassCapabilities.bassMax[0],
    bassMin: +bassCapabilities.bassMin[0]
  };
}

export async function getBass(ipAddress: string): Promise<Bass> {
  const {bass} = await xml2js(await get(ipAddress, "/bass"));

  return {
    actual: +bass.actualbass[0],
    target: +bass.targetbass[0]
  };
}

export function setBass(ipAddress: string, value: number): Promise<void> {
  return post(ipAddress, "/bass", `<bass>${value}</bass>`);
}

export function setName(ipAddress: string, name: string): Promise<void> {
  return post(ipAddress, "/name", `<name>${name}</name>`);
}

export async function getVolume(ipAddress: string): Promise<Volume> {
  const {volume} = await xml2js(await get(ipAddress, "/volume"));

  return <Volume>{
    actualVolume: +volume.actualVolume[0],
    muteEnabled: volume.muteenabled[0] === "true",
    targetVolume: +volume.targetVolume[0]
  }
}

export function setVolume(ipAddress: string, value: number): Promise<void> {
  return post(ipAddress, "/volume", `<volume>${value}</volume>`);
}

function get(host: string, path: string): Promise<string> {
  return makeRequest(HttpMethod.Get, host, path);
}

async function post(host: string, path: string, data: string): Promise<void> {
  await makeRequest(HttpMethod.Post, host, path, data);
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
