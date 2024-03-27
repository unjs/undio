export type DataTypeName =
  | "ArrayBuffer"
  | "Blob"
  | "DataView"
  | "NumberArray"
  | "ReadableStream"
  | "Response"
  | "String"
  | "Uint8Array";

export type DataType =
  | ArrayBufferLike
  | Blob
  | DataView
  | number[]
  | ReadableStream
  | Response
  | string
  | Uint8Array;
