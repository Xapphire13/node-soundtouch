import { Device } from "./Device";
export declare function searchForDevices(timeout?: number): Promise<Device[]>;
export declare function findDevice(name: string, timeout?: number): Promise<Device | null>;
