declare module "node-soundtouch" {
  export declare namespace Api {
    export declare function getInfo(ipAddress: string): Promise<DeviceInfo>;
    export declare function setKey(ipAddress: string, key: Key, state: KeyState): Promise<void>;
    export declare function listSources(ipAddress: string): Promise<Source[]>;
    export declare function selectSource(ipAddress: string, source: Source): Promise<void>;
    export declare function getBassCapabilities(ipAddress: string): Promise<BassCapability>;
    export declare function getBass(ipAddress: string): Promise<Bass>;
    export declare function setBass(ipAddress: string, value: number): Promise<void>;
    export declare function setName(ipAddress: string, name: string): Promise<void>;
    export declare function getVolume(ipAddress: string): Promise<Volume>;
    export declare function setVolume(ipAddress: string, value: number): Promise<void>;
  }
  export declare namespace DiscoveryService {
    export declare function searchForDevices(timeout?: number): Promise<Device[]>;
    export declare function findDevice(name: string, timeout?: number): Promise<Device | null>;
  }
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
      listSources(): Promise<Source[]>;
      selectSource(source: Source): Promise<void>;
      getBassCapabilities(): Promise<BassCapability>;
      getBass(): Promise<Bass>;
      setBass(value: number): Promise<void>;
      setName(name: string): Promise<void>;
      getVolume(): Promise<Volume>;
      setVolume(value: number): Promise<void>;
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
  export declare enum ArtStatus {
      Invalid = "INVALID",
      ShowDefaultImage = "SHOW_DEFAULT_IMAGE",
      Downloading = "DOWNLOADING",
      ImagePresent = "IMAGE_PRESENT",
  }
  export declare enum Key {
      Play = "PLAY",
      Pause = "PAUSE",
      Stop = "STOP",
      PreviousTrack = "PREV_TRACK",
      NextTrack = "NEXT_TRACK",
      ThumbsUp = "THUMBS_UP",
      ThumbsDown = "THUMBS_DOWN",
      Bookmark = "BOOKMARK",
      Power = "POWER",
      Mute = "MUTE",
      VolumeUp = "VOLUME_UP",
      VolumeDown = "VOLUME_DOWN",
      Preset1 = "PRESET_1",
      Preset2 = "PRESET_2",
      Preset3 = "PRESET_3",
      Preset4 = "PRESET_4",
      Preset5 = "PRESET_5",
      Preset6 = "PRESET_6",
      AuxInput = "AUX_INPUT",
      ShuffleOff = "SHUFFLE_OFF",
      ShuffleOn = "SHUFFLE_ON",
      RepeatOff = "REPEAT_OFF",
      RepeatOne = "REPEAT_ONE",
      RepeatAll = "REPEAT_ALL",
      PlayPause = "PLAY_PAUSE",
      AddFavorite = "ADD_FAVORITE",
      RemoveFavorite = "REMOVE_FAVORITE",
      InvalidKey = "INVALID_KEY",
  }
  export declare enum KeyState {
      Press = "press",
      Release = "release",
  }
  export declare enum PlayStatus {
      Playing = "PLAY_STATE",
      Paused = "PAUSE_STATE",
      Stopped = "STOP_STATE",
      Buffering = "BUFFERING_STATE",
      Invalid = "INVALID_PLAY_STATUS",
  }
  export declare enum SourceStatus {
      Unavailable = "UNAVAILABLE",
      Ready = "READY",
  }
  export declare type Source = {
      status: SourceStatus;
      name: string;
      sourceAccount: string;
  };
  export declare type BassCapability = {
      bassAvailable: boolean;
      bassMin: number;
      bassMax: number;
      bassDefault: number;
  };
  export declare type Bass = {
      target: number;
      actual: number;
  };
  export declare type Volume = {
      targetVolume: number;
      actualVolume: number;
      muteEnabled: boolean;
  };
}
