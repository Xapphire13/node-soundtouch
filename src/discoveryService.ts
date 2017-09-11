import {Device} from "./Device";
import {Client} from "node-ssdp";
const sleep = require("sleep-promise");

const ssdpId = "urn:schemas-upnp-org:device:MediaRenderer:1";

export async function searchForDevices(timeout: number = 10000): Promise<Device[]> {
  const client = new Client();
  const foundDevices: Device[] = [];
  client.on("response", async (_headers, _status, info) => {
    try {
      foundDevices.push(await Device.create(info.address));
    } catch (err) {} // Swallow, not all devices that respond are SoundTouch devices
  })
  await client.search(ssdpId);
  await sleep(timeout);
  client.stop();

  return foundDevices;
}

export async function findDevice(name: string, timeout: number = 30000): Promise<Device | null> {
  const client = new Client();

  const devicePromise = new Promise<Device>((res) => {
    client.on("response", async (_headers, _status, info) => {
      try {
        const device = await Device.create(info.address);
        if ((new RegExp(`^${device.name}\$`, "i")).test(name)) {
          res(device);
        }
      } catch (err) {} // Swallow, not all devices that respond are SoundTouch devices
    })
  });

  await client.search(ssdpId);
  const device = await Promise.race([
    devicePromise,
    sleep(timeout)
  ]);

  client.stop();

  return device || null;
}
