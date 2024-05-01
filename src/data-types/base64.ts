import type { Base64, Base64Options } from "../types";
import { assertType } from "./_utils";

const base64DataRegex = /^data:([\w-]+\/[\w-]+)?;base64,/;

/**
 * Test if input matches the [Base64][Base64] data URL (data:[<mediatype>][;base64],<data>) and return `true` or `false`.
 * @group Base64
 */
export function isBase64DataURL(input: unknown): input is Base64 {
  return typeof input === "string" && base64DataRegex.test(input);
}

/**
 * Assert if input matches the [Base64][Base64] data URL (data:[<mediatype>][;base64],<data>) or throw a `TypeError`.
 * @group Base64
 */
export const assertBase64 = (input: unknown, opts?: Base64Options) =>
  // @ts-expect-error
  assertType("Base64", input, (val) => isBase64DataURL(val, opts));

/**
 * Convert from [Base64][Base64] to [Text][Text]
 * @param encoding - The encoding to use. Default is `utf8`.
 * @group Base64
 */
export function base64ToText(string: Base64, opts?: Base64Options): string {
  return new TextDecoder().decode(base64ToUint8Array(string, opts));
}

/**
 * Convert from [Base64][Base64] to [Uint8Array][Uint8Array]
 * @group Base64
 */
export function base64ToUint8Array(
  string: Base64,
  base64Options?: Base64Options,
): Uint8Array {
  return _base64Decode(string, base64Options).bytes;
}

/**
 * Convert from [Base64][Base64] to [ArrayBuffer][ArrayBuffer]
 * @group Base64
 */
export function base64ToArrayBuffer(
  string: Base64,
  base64Options?: Base64Options,
): ArrayBufferLike {
  return _base64Decode(string, base64Options).bytes.buffer;
}

/**
 * Convert from [Base64][Base64] to [Blob][Blob]
 * @group Base64
 */
export function base64ToBlob(
  string: Base64,
  opts?: Base64Options & { blobProps?: BlobPropertyBag },
): Blob {
  const { bytes, type } = _base64Decode(string, opts);
  return new Blob([bytes], {
    type,
    ...opts?.blobProps,
  });
}

/**
 * Convert from [Base64][Base64] to [DataView][DataView]
 * @group Base64
 */
export function base64ToDataView(
  string: Base64,
  base64Options?: Base64Options,
): DataView {
  return new DataView(_base64Decode(string, base64Options).bytes.buffer);
}

/**
 * Convert from [Base64][Base64] to [Number Array][Number Array]
 * @group Base64
 */
export function base64ToNumberArray(
  string: Base64,
  base64Options?: Base64Options,
): number[] {
  return [..._base64Decode(string, base64Options).bytes];
}

/**
 * Convert from [Base64][Base64] to [ReadableStream][ReadableStream]
 * @group Base64
 */
export function base64ToReadableStream(
  string: Base64,
  base64Options?: Base64Options,
): ReadableStream<Uint8Array> {
  return new ReadableStream({
    start(controller) {
      controller.enqueue(_base64Decode(string, base64Options).bytes);
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
  return new Response(base64ToBlob(string, opts), opts?.responseOptions);
}

// --- internal ---

function _base64Decode(input: string, opts?: Base64Options) {
  if (typeof input !== "string") {
    throw new TypeError("base64 input must be a string");
  }

  let encoded = opts?.urlSafe ? _decodeURLSafe(input) : input;
  let type: string | undefined;

  const dataURLMatch = encoded.match(base64DataRegex);
  if (dataURLMatch) {
    type = dataURLMatch[1];
    encoded = encoded.slice(dataURLMatch[0].length);
  }

  const bytes = Uint8Array.from(
    globalThis.atob(encoded),
    (c) => c.codePointAt(0) as number,
  );

  return { bytes, type };
}

function _decodeURLSafe(string: Base64): Base64 {
  return string
    .replace(/-/g, "+")
    .replace(/_/g, "/")
    .padEnd(string.length + ((4 - (string.length % 4)) % 4), "=");
}
