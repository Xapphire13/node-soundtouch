import * as api from "./api";
import * as ds from "./discoveryService";

export namespace Api {
  export const {
    getBass,
    getBassCapabilities,
    getInfo,
    getNowPlaying,
    getVolume,
    listSources,
    selectSource,
    setBass,
    setKey,
    setName,
    setVolume,
    setTimeout
  } = api;
}

export namespace DiscoveryService {
  export const {
    findDevice,
    searchForDevices
  } = ds;
}

export {Component, Device, DeviceInfo, NetworkInfo} from "./Device";
export {
  AlbumArt,
  ArtStatus,
  Bass,
  BassCapability,
  ContentItem,
  Key,
  KeyState,
  NowPlaying,
  PlayStatus,
  Source,
  SourceInfo,
  SourceStatus,
  Volume
} from "./types";
