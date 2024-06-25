/* HAR -- http://www.softwareishard.com/blog/har-12-spec */
export interface Har {
  log: {
    version: string;
    creator: any;
    browser?: any;
    pages: any;
    entries: HarEntry[];
    comment?: string;
  };
}

export interface HarEntry {
  startedDateTime: string;
  request: HarRequest;
  response: HarResponse;
  cache: any;
  timings: any;
  comment?: string;
  serverIPAddress?: string;
  connection?: string;

  _RQDetails?: RQDetails;
}

export interface RQDetails {
  id: string; // request ID
  requestShellCurl: string;
  actions: any; // rules processed // array of actions
  consoleLogs: any; // array of console logs generated by script
  requestState: any;
}

export interface HarRequest {
  method: string;
  url: string;
  cookies: any;
  queryString: HarRequestQueryString[];
  headers: HarHeaderEntry[];
  bodySize: number;
  headersSize: number;
  httpVersion: string;
  comment?: string;
  postData?: HarRequestPostData;
}

export interface HarResponse {
  status: number;
  statusText?: string; // required in spec
  httpVersion: string;
  cookies: any; // empty array
  headers: HarHeaderEntry[];
  comment?: string;
  content: HarResponseContent;
}

interface HarRequestPostData {
  mimeType?: string; // required in spec. optional here because we don't sniff mime type
  text: string;
  params?: any;
  comment?: string;
}

interface HarResponseContent {
  size: number;
  compression?: number;
  mimeType?: string;
  text?: string;
  comment?: string;
  encoding?: string;
}

export type HarRequestQueryString = HarMapEntry;
export type HarHeaderEntry = HarMapEntry;

export interface HarMapEntry {
  name: string;
  value: string;
  comment?: string;
}

/* RQ LOG */
export interface RQNetworkLog {
  id: string;
  timestamp: number;
  url: string;
  request: LogRequest;
  response: LogResponse;
  requestShellCurl: string;
  requestState: string;
  actions: any; // array of applied actions
  consoleLogs: any; // array of logs generated in script based rules
  domain?: string;
  app?: string;
}

interface LogRequest {
  method: string;
  path: string;
  host: string;
  port: string;
  headers: HeaderMap;
  body: any;
  queryParams: HarMapEntry[];
  GQLDetails: GQLDetails | null;
}

interface GQLDetails {
  query: string;
  variables: any; // TBD @nsr
  operationName: string;
}

interface LogResponse {
  statusCode: number;
  headers: HeaderMap;
  contentType: string;
  body: string;
}

export type HeaderMap = Record<string, string>; // {[name] : value}
export type QueryMap = Record<string, string>;
