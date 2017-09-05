import * as api from "./api";
import {Key, KeyState} from "./types";
import {sleep} from "./helpers";

export class Device {
  public name: string;
  public deviceType: string;
  public macAddress: string;
  public ipAddress: string;

  public async pressKey(key: Key): Promise<void> {
    await api.setKey(this, key, KeyState.Press);
    await api.setKey(this, key, KeyState.Release);
  }

  public async holdKey(key: Key): Promise<void> {
    await api.setKey(this, key, KeyState.Press);
    await sleep(5000);
    await api.setKey(this, key, KeyState.Release);
  }
}
