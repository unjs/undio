import type { Base64, Base64Options } from "../types";
import { _base64Encode, assertType } from "./_utils";

/**
 * Test if input is an instance of [String][String] and return `true` or `false`.
 * @group String
 */
export function isString(input: any): input is string {
  return typeof input === "string";
}

/**
 * Assert that input is an instance of [String][String] or throw a `TypeError`.
 * @group String
 */
export const assertString = (input: unknown) =>
  assertType("String", input, isString);

/**
 * Convert from [string][string] to [ArrayBuffer][ArrayBuffer]
 * @group String
 */
export function stringToArrayBuffer(string: string): ArrayBufferLike {
  assertString(string);
  return new TextEncoder().encode(string).buffer;
}

/**
 * Convert from [string][string] to [Blob][Blob]
 * @group String
 */
export function stringToBlob(string: string, options?: BlobPropertyBag): Blob {
  assertString(string);
  return new Blob([new TextEncoder().encode(string)], options);
}

/**
 * Convert from [string][string] to [DataView][DataView]
 * @group String
 */
export function stringToDataView(string: string): DataView {
  assertString(string);
  return new DataView(new TextEncoder().encode(string).buffer);
}

/**
 * Convert from [string][string] to [Number Array][Number Array]
 * @group String
 */
export function stringToNumberArray(string: string): number[] {
  assertString(string);
  return [...new TextEncoder().encode(string)];
}

/**
 * Convert from [string][string] to [ReadableStream][ReadableStream]
 * @group String
 */
export function stringToReadableStream(
  string: string,
): ReadableStream<Uint8Array> {
  assertString(string);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new TextEncoder().encode(string));
      controller.close();
    },
  });
}

export function stringToResponse(
  string: string,
  init?: ResponseInit,
): Response {
  assertString(string);
  return new Response(string, init);
}

/**
 * Convert from [string][string] to [Uint8Array][Uint8Array]
 * @group String
 */
export function stringToUint8Array(string: string): Uint8Array {
  assertString(string);
  return new Uint8Array(new TextEncoder().encode(string));
}

/**
 * Convert from [string][string] to [Base64][Base64]
 * @param encoding - The encoding to use. Default is `utf8`.
 * @group String
 */
export function stringToBase64(
  string: string,
  opts?: Base64Options & { encoding?: "utf8" },
): Base64 {
  assertString(string);
  return opts?.encoding === "utf8"
    ? _base64Encode(new TextEncoder().encode(string), opts)
    : _base64Encode(string, opts);
}
