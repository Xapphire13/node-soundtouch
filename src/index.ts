import * as api from "./api";
import * as ds from "./discoveryService";

export namespace Api {
  export const {
    getBass,
    getBassCapabilities,
    getInfo,
    getVolume,
    listSources,
    selectSource,
    setBass,
    setKey,
    setName,
    setVolume
  } = api;
}

export namespace DiscoveryService {
  export const {
    findDevice,
    searchForDevices
  } = ds;
}

export {Component, Device, DeviceInfo, NetworkInfo} from "./Device";
export {ArtStatus, Bass, BassCapability, Key, KeyState, PlayStatus, Source, SourceStatus} from "./types";
