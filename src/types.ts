import type { Readable as NodeStream } from "node:stream";

export type DataTypeName =
  | "ArrayBuffer"
  | "Base64"
  | "Blob"
  | "DataView"
  | "NodeStream"
  | "NumberArray"
  | "ReadableStream"
  | "Response"
  | "Text"
  | "Uint8Array";

export type DataType =
  | ArrayBufferLike
  | Base64
  | Blob
  | DataView
  | NodeStream
  | number[]
  | ReadableStream
  | Response
  | string
  | Uint8Array;

export type _DataTypeMap = {
  ArrayBuffer: ArrayBufferLike;
  Base64: Base64;
  Blob: Blob;
  DataView: DataView;
  NodeStream: NodeStream;
  NumberArray: number[];
  ReadableStream: ReadableStream;
  Response: Response;
  Text: string;
  Uint8Array: Uint8Array;
};
export type DataTypeMap<T extends DataTypeName> = _DataTypeMap[T];

export type Base64 = string;

export type Base64Options = { urlSafe?: boolean };
