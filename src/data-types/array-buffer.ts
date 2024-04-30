import type { Base64, Base64Options } from "../types";
import { _base64Encode, assertType } from "./_utils";

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
 * Convert from [ArrayBuffer][ArrayBuffer] to [Text][Text]
 * @group ArrayBuffer
 */
export function arrayBufferToText(arrayBuffer: ArrayBuffer): string {
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

/**
 * Convert from [ArrayBuffer][ArrayBuffer] to [Base64][Base64]
 * @group ArrayBuffer
 */
export function arrayBufferToBase64(
  arrayBuffer: ArrayBufferLike,
  base64Options: Base64Options,
): Base64 {
  assertArrayBuffer(arrayBuffer);
  return _base64Encode(new Uint8Array(arrayBuffer), base64Options);
}
