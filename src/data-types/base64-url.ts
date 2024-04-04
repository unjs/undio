import { Base64, Base64Url } from "../types";
import { assertType } from "./_utils";

/**
 * Test if input is string and matches the [Base64Url][Base64] pattern and return `true` or `false`.
 * @group Base64Url
 */
export function isBase64Url(input: any): input is Base64Url {
  return typeof input === "string" && /^[\w-]*$/.test(input);
}

/**
 * Assert that input is an instance of [String][String] and matches the [Base64Url][Base64] pattern or throw a `TypeError`.
 * @group Base64Url
 */
export const assertBase64Url = (input: unknown) =>
  assertType("Base64Url", input, isBase64Url);

/**
 * Convert from [Base64Url][Base64] url to [Base64][Base64]
 * @group Base64Url
 */
export function base64UrlToBase64(string: string): Base64 {
  assertBase64Url(string);
  string = string.replace(/-/g, "+").replace(/_/g, "/");
  const paddingLength = string.length % 4;
  if (paddingLength === 2) {
    string += "==";
  } else if (paddingLength === 3) {
    string += "=";
  }
  return string as Base64;
}

/**
 * Convert from [Base64Url][Base64] url to [String][String]
 * @group Base64Url
 */
export function base64UrlToString(string: string): string {
  assertBase64Url(string);
  return new TextDecoder().decode(base64UrlToUint8Array(string));
}

/**
 * Convert from [Base64Url][Base64] url to [Uint8Array][Uint8Array]
 * @group Base64Url
 */
export function base64UrlToUint8Array(string: string): Uint8Array {
  assertBase64Url(string);
  string = string.replace(/-/g, "+").replace(/_/g, "/");
  const paddingLength = string.length % 4;
  if (paddingLength === 2) {
    string += "==";
  } else if (paddingLength === 3) {
    string += "=";
  }
  return Uint8Array.from(
    globalThis.atob(string),
    (c) => c.codePointAt(0) as number,
  );
}

/**
 * Convert from [Base64Url][Base64] url to [ArrayBuffer][ArrayBuffer]
 * @group Base64Url
 */

export function base64UrlToArrayBuffer(string: string): ArrayBufferLike {
  assertBase64Url(string);
  return base64UrlToUint8Array(string).buffer;
}

/**
 * Convert from [Base64Url][Base64] url to [Blob][Blob]
 * @group Base64Url
 */
export function base64UrlToBlob(
  string: string,
  options?: BlobPropertyBag,
): Blob {
  assertBase64Url(string);
  return new Blob([base64UrlToUint8Array(string)], options);
}

/**
 * Convert from [Base64Url][Base64] url to [DataView][DataView]
 * @group Base64Url
 */
export function base64UrlToDataView(string: string): DataView {
  assertBase64Url(string);
  return new DataView(base64UrlToArrayBuffer(string));
}

/**
 * Convert from [Base64Url][Base64] url to [Number Array][Number Array]
 * @group Base64Url
 */
export function base64UrlToNumberArray(string: string): number[] {
  assertBase64Url(string);
  return [...base64UrlToUint8Array(string)];
}

/**
 * Convert from [Base64Url][Base64] url to [ReadableStream][ReadableStream]
 * @group Base64Url
 */
export function base64UrlToReadableStream(
  string: string,
): ReadableStream<Uint8Array> {
  assertBase64Url(string);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(base64UrlToUint8Array(string));
      controller.close();
    },
  });
}

/**
 * Convert from [Base64Url][Base64] url to [Response][Response]
 * @group Base64Url
 */
export function base64UrlToResponse(
  string: string,
  init?: ResponseInit,
): Response {
  assertBase64Url(string);
  return new Response(base64UrlToUint8Array(string), init);
}
