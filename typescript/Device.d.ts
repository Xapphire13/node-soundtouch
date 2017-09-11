import { Bass, BassCapability, Key, NowPlaying, SourceInfo, Volume } from "./types";
export declare class Device {
    ipAddress: string;
    static create(ipAddress: string): Promise<Device>;
    name: string;
    deviceType: string;
    macAddress: string;
    constructor(ipAddress: string);
    getInfo(): Promise<DeviceInfo>;
    pressKey(key: Key): Promise<void>;
    holdKey(key: Key): Promise<void>;
    listSources(): Promise<SourceInfo[]>;
    selectSource(source: SourceInfo): Promise<void>;
    getBassCapabilities(): Promise<BassCapability>;
    getBass(): Promise<Bass>;
    setBass(value: number): Promise<void>;
    setName(name: string): Promise<void>;
    getVolume(): Promise<Volume>;
    setVolume(value: number): Promise<void>;
    getNowPlaying(): Promise<NowPlaying>;
    isPoweredOn(): Promise<boolean>;
    powerOn(): Promise<void>;
    powerOff(): Promise<void>;
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
    ipAddress: string;
}
