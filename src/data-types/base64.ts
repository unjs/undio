import type { Base64, Base64Options } from "../types";
import { assertType } from "./_utils";

const base64Regex =
  /^(?:[\d+/A-Za-z]{4})*(?:[\d+/A-Za-z]{2}==|[\d+/A-Za-z]{3}=)?$/;

const base64URLRegex = /^[\w-]*$/;

function _decodeURLSafe(string: Base64): Base64 {
  return string
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(string.length + ((4 - (string.length % 4)) % 4), "=");
}

/**
 * Test if input is string and matches the [Base64][Base64] pattern and return `true` or `false`.
 * @group Base64
 */
export function isBase64(
  input: unknown,
  base64Options?: Base64Options,
): input is Base64 {
  return (
    typeof input === "string" &&
    (base64Options?.urlSafe ? base64URLRegex : base64Regex).test(input)
  );
}

/**
 * Assert that input is an instance of [Text][Text] and matches the [Base64][Base64] pattern or throw a `TypeError`.
 * @group Base64
 */
export const assertBase64 = (input: unknown, opts?: Base64Options) =>
  // @ts-expect-error
  assertType("Base64", input, (val) => isBase64(val, opts));

/**
 * Convert from [Base64][Base64] to [Text][Text]
 * @param encoding - The encoding to use. Default is `utf8`.
 * @group Base64
 */
export function base64ToText(
  string: Base64,
  opts?: Base64Options & { encoding?: "utf8" },
): string {
  if (opts?.encoding === "utf8") {
    return new TextDecoder().decode(base64ToUint8Array(string, opts));
  }
  assertBase64(string, opts);
  return globalThis.atob(opts?.urlSafe ? _decodeURLSafe(string) : string);
}

/**
 * Convert from [Base64][Base64] to [Uint8Array][Uint8Array]
 * @group Base64
 */
export function base64ToUint8Array(
  string: Base64,
  base64Options?: Base64Options,
): Uint8Array {
  assertBase64(string, base64Options);
  return Uint8Array.from(
    globalThis.atob(base64Options?.urlSafe ? _decodeURLSafe(string) : string),
    (c) => c.codePointAt(0) as number,
  );
}

/**
 * Convert from [Base64][Base64] to [ArrayBuffer][ArrayBuffer]
 * @group Base64
 */
export function base64ToArrayBuffer(
  string: Base64,
  base64Options?: Base64Options,
): ArrayBufferLike {
  // assertBase64(string);
  return base64ToUint8Array(string, base64Options).buffer;
}

/**
 * Convert from [Base64][Base64] to [Blob][Blob]
 * @group Base64
 */
export function base64ToBlob(
  string: Base64,
  opts?: Base64Options & { blobProps?: BlobPropertyBag },
): Blob {
  // assertBase64(string);
  return new Blob([base64ToUint8Array(string, opts)], opts?.blobProps);
}

/**
 * Convert from [Base64][Base64] to [DataView][DataView]
 * @group Base64
 */
export function base64ToDataView(
  string: Base64,
  base64Options?: Base64Options,
): DataView {
  // assertBase64(string);
  return new DataView(base64ToArrayBuffer(string, base64Options));
}

/**
 * Convert from [Base64][Base64] to [Number Array][Number Array]
 * @group Base64
 */
export function base64ToNumberArray(
  string: Base64,
  base64Options?: Base64Options,
): number[] {
  // assertBase64(string);
  return [...base64ToUint8Array(string, base64Options)];
}

/**
 * Convert from [Base64][Base64] to [ReadableStream][ReadableStream]
 * @group Base64
 */
export function base64ToReadableStream(
  string: Base64,
  base64Options?: Base64Options,
): ReadableStream<Uint8Array> {
  // assertBase64(string);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(base64ToUint8Array(string, base64Options));
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
  opts?: Base64Options & {
    responseOptions?: ResponseInit;
    blobProps: BlobPropertyBag;
  },
): Response {
  // assertBase64(string);
  return new Response(base64ToBlob(string, opts), opts?.responseOptions);
}
