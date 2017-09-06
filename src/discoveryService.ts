import {Device, createDevice} from "./Device";
import {Client} from "node-ssdp";
const sleep = require("sleep-promise");

export async function searchForDevices(timeout: number = 10000): Promise<Device[]> {
  const client = new Client();
  const foundDevices: Device[] = [];
  client.on("response", async (_headers, _status, info) => {
    foundDevices.push(await createDevice(info.address));
  })
  await client.search("urn:schemas-upnp-org:device:MediaRenderer:1");
  await sleep(timeout);
  client.stop();

  return foundDevices;
}

export async function findDevice(name: string, timeout: number = 30000): Promise<Device | null> {
  const client = new Client();

  const devicePromise = new Promise<Device>((res) => {
    client.on("response", async (_headers, _status, info) => {
      const device = await createDevice(info.address);
      if ((new RegExp(`^${device.name}\$`, "i")).test(name)) {
        res(device);
      }
    })
  });

  await client.search("urn:schemas-upnp-org:device:MediaRenderer:1");
  const device = await Promise.race([
    devicePromise,
    sleep(timeout)
  ]);

  client.stop();

  return device || null;
}
