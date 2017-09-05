import * as http from "http";

import {Key, KeyState} from "./types";
import {Device} from "./Device";

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
