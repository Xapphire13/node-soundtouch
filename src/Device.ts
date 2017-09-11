import * as api from "./api";
import {
  Bass,
  BassCapability,
  Key,
  KeyState,
  NowPlaying,
  Source,
  SourceInfo,
  Volume
} from "./types";
const sleep = require("sleep-promise");

export class Device {
  public static async create(ipAddress: string): Promise<Device> {
    const device = new Device(ipAddress);
    const deviceInfo = await device.getInfo();
    device.deviceType = deviceInfo.deviceType;
    device.name = deviceInfo.name;
    device.macAddress = deviceInfo.networkInfo.macAddress;

    return device;
  }

  public name: string;
  public deviceType: string;
  public macAddress: string;

  constructor(public ipAddress: string) {}

  public getInfo(): Promise<DeviceInfo> {
    return api.getInfo(this.ipAddress);
  }

  public async pressKey(key: Key): Promise<void> {
    await api.setKey(this.ipAddress, key, KeyState.Press);
    await api.setKey(this.ipAddress, key, KeyState.Release);
  }

  public async holdKey(key: Key): Promise<void> {
    await api.setKey(this.ipAddress, key, KeyState.Press);
    await sleep(5000);
    await api.setKey(this.ipAddress, key, KeyState.Release);
  }

  public listSources(): Promise<SourceInfo[]> {
    return api.listSources(this.ipAddress);
  }

  public selectSource(source: SourceInfo): Promise<void> {
    return api.selectSource(this.ipAddress, source);
  }

  public getBassCapabilities(): Promise<BassCapability> {
    return api.getBassCapabilities(this.ipAddress);
  }

  public getBass(): Promise<Bass> {
    return api.getBass(this.ipAddress);
  }

  public setBass(value: number): Promise<void> {
    return api.setBass(this.ipAddress, value);
  }

  public async setName(name: string): Promise<void> {
    await api.setName(this.ipAddress, name);
    this.name = name;
  }

  public getVolume(): Promise<Volume> {
    return api.getVolume(this.ipAddress);
  }

  public setVolume(value: number): Promise<void> {
    return api.setVolume(this.ipAddress, value);
  }

  public getNowPlaying(): Promise<NowPlaying> {
    return api.getNowPlaying(this.ipAddress);
  }

  public async isPoweredOn(): Promise<boolean> {
    return (await this.getNowPlaying()).source !== Source.Standby;
  }

  public async powerOn(): Promise<void> {
    if (!(await this.isPoweredOn())) {
      await this.pressKey(Key.Power);
    }
  }

  public async powerOff(): Promise<void> {
    if (await this.isPoweredOn()) {
      await this.pressKey(Key.Power);
    }
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
