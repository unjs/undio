import { DataType } from "../types";
import { ConvertMap, assertType, convertTo } from "./_utils";

/**
 * Test if input is an instance of [ArrayBuffer][ArrayBuffer] and return `true` or `false`.
 * @group ArrayBuffer
 */
export function isArrayBuffer(input: unknown): input is ArrayBuffer {
  return input instanceof ArrayBuffer;
}

/**
 * Assert that input is an instance of [ArrayBuffer][ArrayBuffer] or throw a `TypeError`.
 * @group ArrayBuffer
 */
export const assertArrayBuffer = (input: unknown) =>
  assertType("ArrayBuffer", input, isArrayBuffer);

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [Blob][Blob]
 * @group ArrayBuffer
 */
export function arrayBufferToBlob(
  arrayBuffer: ArrayBuffer,
  options?: BlobPropertyBag,
): Blob {
  assertArrayBuffer(arrayBuffer);
  return new Blob([arrayBuffer], options);
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [DataView][DataView]
 * @group ArrayBuffer
 */
export function arrayBufferToDataView(arrayBuffer: ArrayBufferLike): DataView {
  assertArrayBuffer(arrayBuffer);
  return new DataView(arrayBuffer);
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [Number Array][Number Array]
 * @group ArrayBuffer
 */
export function arrayBufferToNumberArray(
  arrayBuffer: ArrayBufferLike,
): number[] {
  assertArrayBuffer(arrayBuffer);
  return [...new Uint8Array(arrayBuffer)];
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [ReadableStream][ReadableStream]
 * @group ArrayBuffer
 */
export function arrayBufferToReadableStream(
  arrayBuffer: ArrayBufferLike,
): ReadableStream<Uint8Array> {
  assertArrayBuffer(arrayBuffer);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(arrayBuffer));
      controller.close();
    },
  });
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [Response][Response]
 * @group ArrayBuffer
 */
export function arrayBufferToResponse(
  arrayBuffer: ArrayBuffer,
  init?: ResponseInit,
): Response {
  assertArrayBuffer(arrayBuffer);
  return new Response(arrayBuffer, init);
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [String][String]
 * @group ArrayBuffer
 */
export function arrayBufferToString(arrayBuffer: ArrayBuffer): string {
  assertArrayBuffer(arrayBuffer);
  return new TextDecoder().decode(arrayBuffer);
}

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [Uint8Array][Uint8Array]
 *
 * @group ArrayBuffer
 */
export function arrayBufferToUint8Array(
  arrayBuffer: ArrayBufferLike,
): Uint8Array {
  assertArrayBuffer(arrayBuffer);
  return new Uint8Array(arrayBuffer);
}

const _convertMap: ConvertMap<ArrayBuffer> = {
  ArrayBuffer: (input) => input,
  Blob: arrayBufferToBlob,
  DataView: arrayBufferToDataView,
  NumberArray: arrayBufferToNumberArray,
  ReadableStream: arrayBufferToReadableStream,
  Response: arrayBufferToResponse,
  String: arrayBufferToString,
  Uint8Array: arrayBufferToUint8Array,
} as const;

/**
 * Convert from any value to [ArrayBuffer][ArrayBuffer]
 * @group ArrayBuffer
 */
export const toArrayBuffer = (input: DataType) =>
  convertTo<ArrayBuffer>("ArrayBuffer", input, _convertMap);
