import * as api from "./api";
import {Key, KeyState, Source} from "./types";
const sleep = require("sleep-promise");

export async function createDevice(ipAddress: string): Promise<Device> {
  const device = new Device(ipAddress);
  const deviceInfo = await device.getInfo();
  device.deviceType = deviceInfo.deviceType;
  device.name = deviceInfo.name;
  device.macAddress = deviceInfo.networkInfo.macAddress;

  return device;
}

export class Device {
  public name: string;
  public deviceType: string;
  public macAddress: string;

  constructor(public ipAddress: string) {}

  public getInfo(): Promise<DeviceInfo> {
    return api.getInfo(this);
  }

  public async pressKey(key: Key): Promise<void> {
    await api.setKey(this, key, KeyState.Press);
    await api.setKey(this, key, KeyState.Release);
  }

  public async holdKey(key: Key): Promise<void> {
    await api.setKey(this, key, KeyState.Press);
    await sleep(5000);
    await api.setKey(this, key, KeyState.Release);
  }

  public listSources(): Promise<Source[]> {
    return api.listSources(this);
  }

  public selectSource(source: Source): Promise<void> {
    return api.selectSource(this, source);
  }
}

export interface DeviceInfo {
  name: string;
  deviceType: string;
  margeAccountUuid: string;
  margeUrl: string;
  components: Component[];
  networkInfo: NetworkInfo;
}

export interface Component {
  category: string;
  softwareVersion: string;
  serialNumber: string;
}

export interface NetworkInfo {
  macAddress: string;
  ipAddress: string
}
