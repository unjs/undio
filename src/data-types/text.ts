import type { Base64, Base64Options } from "../types";
import { _base64Encode, assertType } from "./_utils";

/**
 * Test if input is an instance of [Text][Text] and return `true` or `false`.
 * @group Text
 */
export function isText(input: unknown): input is string {
  return typeof input === "string";
}

/**
 * Assert that input is an instance of [Text][Text] or throw a `TypeError`.
 * @group Text
 */
export const assertText = (input: unknown) => assertType("Text", input, isText);

/**
 * Convert from [Text][Text] to [ArrayBuffer][ArrayBuffer]
 * @group Text
 */
export function textToArrayBuffer(string: string): ArrayBufferLike {
  assertText(string);
  return new TextEncoder().encode(string).buffer;
}

/**
 * Convert from [Text][Text] to [Blob][Blob]
 * @group Text
 */
export function textToBlob(string: string, options?: BlobPropertyBag): Blob {
  assertText(string);
  return new Blob([new TextEncoder().encode(string)], options);
}

/**
 * Convert from [Text][Text] to [DataView][DataView]
 * @group Text
 */
export function textToDataView(string: string): DataView {
  assertText(string);
  return new DataView(new TextEncoder().encode(string).buffer);
}

/**
 * Convert from [Text][Text] to [Number Array][Number Array]
 * @group Text
 */
export function textToNumberArray(string: string): number[] {
  assertText(string);
  return [...new TextEncoder().encode(string)];
}

/**
 * Convert from [Text][Text] to [ReadableStream][ReadableStream]
 * @group Text
 */
export function textToReadableStream(
  string: string,
): ReadableStream<Uint8Array> {
  assertText(string);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(string));
      controller.close();
    },
  });
}

export function textToResponse(string: string, init?: ResponseInit): Response {
  assertText(string);
  return new Response(string, init);
}

/**
 * Convert from [Text][Text] to [Uint8Array][Uint8Array]
 * @group Text
 */
export function textToUint8Array(string: string): Uint8Array {
  assertText(string);
  return new Uint8Array(new TextEncoder().encode(string));
}

/**
 * Convert from [Text][Text] to [Base64][Base64]
 * @param encoding - The encoding to use. Default is `utf8`.
 * @group Text
 */
export function textToBase64(string: string, opts?: Base64Options): Base64 {
  assertText(string);
  return _base64Encode(new TextEncoder().encode(string), opts);
}
