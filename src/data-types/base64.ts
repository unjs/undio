import { Base64, Base64Url } from "../types";
import { assertType } from "./_utils";

/**
 * Test if input is string and matches the [Base64][Base64] pattern and return `true` or `false`.
 * @group Base64
 */
export function isBase64(input: any): input is Base64 {
  return (
    typeof input === "string" &&
    /^(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}==|[\d+/A-Za-z]{3}=)?$/.test(input)
  );
}

/**
 * Assert that input is an instance of [String][String] and matches the [Base64][Base64] pattern or throw a `TypeError`.
 * @group Base64
 */
export const assertBase64 = (input: unknown) =>
  assertType("Base64", input, isBase64);

/**
 * Convert from [Base64][Base64] to [Base64Url][Base64]
 * @group Base64
 */
export function base64ToBase64Url(string: Base64): Base64Url {
  assertBase64(string);
  return string
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "") as Base64Url;
}

/**
 * Convert from [Base64][Base64] to [String][String]
 * @param encoding - The encoding to use. Default is `utf8`.
 * @group Base64
 */
export function base64ToString(
  string: Base64,
  encoding?: "ascii" | "utf8",
): string {
  assertBase64(string);
  if (encoding === "ascii") {
    return globalThis.atob(string);
  }
  return new TextDecoder().decode(base64ToUint8Array(string));
}

/**
 * Convert from [Base64][Base64] to [Uint8Array][Uint8Array]
 * @group Base64
 */
export function base64ToUint8Array(string: Base64): Uint8Array {
  assertBase64(string);
  return Uint8Array.from(
    globalThis.atob(string),
    (c) => c.codePointAt(0) as number,
  );
}

/**
 * Convert from [Base64][Base64] to [ArrayBuffer][ArrayBuffer]
 * @group Base64
 */
export function base64ToArrayBuffer(string: Base64): ArrayBufferLike {
  assertBase64(string);
  return base64ToUint8Array(string).buffer;
}

/**
 * Convert from [Base64][Base64] to [Blob][Blob]
 * @group Base64
 */
export function base64ToBlob(string: Base64, options?: BlobPropertyBag): Blob {
  assertBase64(string);
  return new Blob([base64ToUint8Array(string)], options);
}

/**
 * Convert from [Base64][Base64] to [DataView][DataView]
 * @group Base64
 */
export function base64ToDataView(string: Base64): DataView {
  assertBase64(string);
  return new DataView(base64ToArrayBuffer(string));
}

/**
 * Convert from [Base64][Base64] to [Number Array][Number Array]
 * @group Base64
 */
export function base64ToNumberArray(string: Base64): number[] {
  assertBase64(string);
  return [...base64ToUint8Array(string)];
}

/**
 * Convert from [Base64][Base64] to [ReadableStream][ReadableStream]
 * @group Base64
 */
export function base64ToReadableStream(
  string: Base64,
): ReadableStream<Uint8Array> {
  assertBase64(string);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(base64ToUint8Array(string));
      controller.close();
    },
  });
}

/**
 * Convert from [Base64][Base64] to [Response][Response]
 * @group Base64
 */
export function base64ToResponse(
  string: Base64,
  init?: ResponseInit,
): Response {
  assertBase64(string);
  return new Response(base64ToBlob(string), init);
}
