import { DataType } from "../types";
import { assertType, ConvertMap, convertTo } from "./_utils";

/**
 * Test if input is instance of [Blob][Blob] and return `true` or `false`.
 * @group Blob
 */
export function isBlob(input: any): input is Blob {
  return input instanceof Blob;
}

/**
 * Assert that input is instance of [Blob][Blob] or throw a `TypeError`.
 * @group Blob
 */
export const assertBlob = (input: unknown) => assertType("Blob", input, isBlob);

/**
 * Convert from [Blob][Blob] to [ArrayBuffer][ArrayBuffer]
 * @group Blob
 */
export function blobToArrayBuffer(blob: Blob): Promise<ArrayBuffer> {
  assertBlob(blob);
  return blob.arrayBuffer();
}

/**
 * Convert from [Blob][Blob] to [DataView][DataView]
 * @group Blob
 */
export function blobToDataView(blob: Blob): Promise<DataView> {
  assertBlob(blob);
  return blob.arrayBuffer().then((arrayBuffer) => new DataView(arrayBuffer));
}

/**
 * Convert from [Blob][Blob] to [Number Array][Number Array]
 * @group Blob
 */
export function blobToNumberArray(blob: Blob): Promise<number[]> {
  assertBlob(blob);
  return blob
    .arrayBuffer()
    .then((arrayBuffer) => [...new Uint8Array(arrayBuffer)]);
}

/**
 * Convert from [Blob][Blob] to [ReadableStream][ReadableStream]
 * @group Blob
 */
export function blobToReadableStream(blob: Blob): ReadableStream<Uint8Array> {
  assertBlob(blob);
  return blob.stream();
}

/**
 * Convert from [Blob][Blob] to [String][String]
 * @group Blob
 */
export function blobToString(blob: Blob): Promise<string> {
  assertBlob(blob);
  return blob.text();
}

/**
 * Convert from [Blob][Blob] to [Uint8Array][Uint8Array]
 * @group Blob
 */
export function blobToUint8Array(blob: Blob): Promise<Uint8Array> {
  assertBlob(blob);
  return blob.arrayBuffer().then((arrayBuffer) => new Uint8Array(arrayBuffer));
}

const _convertMap: ConvertMap<Blob> = {
  ArrayBuffer: blobToArrayBuffer,
  Blob: (input) => input,
  DataView: blobToDataView,
  NumberArray: blobToNumberArray,
  ReadableStream: blobToReadableStream,
  String: blobToString,
  Uint8Array: blobToUint8Array,
} as const;

/**
 * Convert from any value to [Blob][Blob]
 * @group Blob
 */
export const toBlob = (input: DataType) =>
  convertTo<Blob>("Blob", input, _convertMap);
