export type DataTypeName =
  | "ArrayBuffer"
  | "Base64"
  | "Blob"
  | "DataView"
  | "NumberArray"
  | "ReadableStream"
  | "Response"
  | "String"
  | "Uint8Array";

export type DataType =
  | ArrayBufferLike
  | Base64
  | Blob
  | DataView
  | number[]
  | ReadableStream
  | Response
  | string
  | Uint8Array;

export type Base64 = string;
export type Base64Options = { urlSafe?: boolean };
