import * as api from "./api";
import * as ds from "./discoveryService";
export declare namespace Api {
    const getBass: typeof api.getBass, getBassCapabilities: typeof api.getBassCapabilities, getInfo: typeof api.getInfo, getNowPlaying: typeof api.getNowPlaying, getVolume: typeof api.getVolume, listSources: typeof api.listSources, selectSource: typeof api.selectSource, setBass: typeof api.setBass, setKey: typeof api.setKey, setName: typeof api.setName, setVolume: typeof api.setVolume;
}
export declare namespace DiscoveryService {
    const findDevice: typeof ds.findDevice, searchForDevices: typeof ds.searchForDevices;
}
export { Component, Device, DeviceInfo, NetworkInfo } from "./Device";
export { AlbumArt, ArtStatus, Bass, BassCapability, ContentItem, Key, KeyState, NowPlaying, PlayStatus, Source, SourceInfo, SourceStatus, Volume } from "./types";
