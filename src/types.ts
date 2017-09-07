export enum ArtStatus {
  Invalid = "INVALID",
  ShowDefaultImage = "SHOW_DEFAULT_IMAGE",
  Downloading = "DOWNLOADING",
  ImagePresent = "IMAGE_PRESENT"
}

export enum Key {
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
  InvalidKey = "INVALID_KEY"
}

export enum KeyState {
  Press = "press",
  Release = "release"
}

export enum PlayStatus {
  Playing = "PLAY_STATE",
  Paused = "PAUSE_STATE",
  Stopped = "STOP_STATE",
  Buffering = "BUFFERING_STATE",
  Invalid = "INVALID_PLAY_STATUS"
}

export enum SourceStatus {
  Unavailable = "UNAVAILABLE",
  Ready = "READY"
}

export type Source = {
  status: SourceStatus;
  name: string;
  sourceAccount: string;
};

export type BassCapability = {
  bassAvailable: boolean;
  bassMin: number;
  bassMax: number;
  bassDefault: number;
}

export type Bass = {
  target: number;
  actual: number;
}
