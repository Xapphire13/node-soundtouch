declare module "node-ssdp" {
  export interface ResponseHeaders {
    ST: string;
    USN: string;
    LOCATION: string;
    EXT: string;
    SERVER: string;
    "CACHE-CONTROL": string;
    DATE: string;
    "CONTENT-LENGTH": string;
  }

  export interface ResponseInfo {
    address: string;
    family: string;
    port: number;
    size: number;
  }

  export class Client {
    public search(urn: string): Promise<void>;
    public search(urn: "ssdp:all"): Promise<void>;
    public stop(): void;

    public on(event: "notify", cb: () => void): void;
    public on(event: "response", cb: (headers: ResponseHeaders, code: number, rinfo: ResponseInfo) => void): void;
  }
}
