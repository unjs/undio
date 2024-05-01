import type { Readable as NodeStream } from "node:stream";
import type { Base64, Base64Options } from "../types";
import { _base64Encode, assertType } from "./_utils";

/**
 * Test if input is an instance of [NodeStream][NodeStream] and return `true` or `false`.
 * @group NodeStream
 */
export function isNodeStream(input: unknown): input is NodeStream {
  try {
    // @ts-ignore
    return "pipe" in input && typeof input.pipe === "function";
  } catch {
    return false;
  }
}

/**
 * Assert that input is an instance of [NodeStream][NodeStream] or throw a `TypeError`.
 * @group NodeStream
 */
export const assertNodeStream = (input: unknown) =>
  assertType("NodeStream", input, isNodeStream);

/**
 * Convert from [NodeStream][NodeStream] to [ArrayBuffer][ArrayBuffer]
 * @group NodeStream
 */
export async function nodeStreamToArrayBuffer(
  input: NodeStream,
): Promise<ArrayBufferLike> {
  const bytes = await nodeStreamToUint8Array(input);
  return bytes.buffer;
}

/**
 * Convert from [NodeStream][NodeStream] to [Blob][Blob]
 * @group NodeStream
 */
export async function nodeStreamToBlob(
  input: NodeStream,
  options?: BlobPropertyBag,
): Promise<Blob> {
  return new Blob([await nodeStreamToUint8Array(input)], options);
}

/**
 * Convert from [NodeStream][NodeStream] to [DataView][DataView]
 * @group NodeStream
 */
export async function nodeStreamToDataView(
  input: NodeStream,
): Promise<DataView> {
  const bytes = await nodeStreamToUint8Array(input);
  return new DataView(bytes.buffer);
}

/**
 * Convert from [NodeStream][NodeStream] to [Number Array][Number Array]
 * @group NodeStream
 */
export async function nodeStreamToNumberArray(
  input: NodeStream,
): Promise<number[]> {
  assertNodeStream(input);
  return [...(await nodeStreamToUint8Array(input))];
}

/**
 * Convert from [NodeStream][NodeStream] to [ReadableStream][ReadableStream]
 * @group NodeStream
 */
export async function nodeStreamToReadableStream(
  input: NodeStream,
): Promise<ReadableStream> {
  assertNodeStream(input);
  return new ReadableStream({
    async start(controller) {
      input.on("data", (chunk: Uint8Array) => {
        controller.enqueue(chunk);
      });
      input.once("error", (error) => {
        controller.error(error);
      });
      input.once("end", () => {
        controller.close();
      });
    },
  });
}

/**
 * Convert from [NodeStream][NodeStream] to [Text][Text]
 * @group NodeStream
 */
export async function nodeStreamToText(input: NodeStream): Promise<string> {
  const bytes = await nodeStreamToUint8Array(input);
  return new TextDecoder().decode(bytes);
}

/**
 * Convert from [NodeStream][NodeStream] to [Response][Response]
 * @group NodeStream
 */
export async function nodeStreamToResponse(
  input: NodeStream,
  init?: ResponseInit,
): Promise<Response> {
  assertNodeStream(input);
  return new Response(await nodeStreamToReadableStream(input), init);
}

/**
 * Convert from [NodeStream][NodeStream] to [Uint8Array][Uint8Array]
 * @group NodeStream
 */
export async function nodeStreamToUint8Array(
  input: NodeStream,
): Promise<Uint8Array> {
  assertNodeStream(input);
  const chunks = await _readStreamToChunks(input);
  let length = 0;
  for (const chunk of chunks) {
    length += chunk.length;
  }
  const result = new Uint8Array(length);
  let offset = 0;
  for (const chunk of chunks) {
    result.set(chunk, offset);
    offset += chunk.length;
  }
  return result;
}

/**
 * Convert from [NodeStream][NodeStream] to [Base64][Base64]
 * @group NodeStream
 */
export async function nodeStreamToBase64(
  input: NodeStream,
  base64Options?: Base64Options,
): Promise<Base64> {
  return _base64Encode(await nodeStreamToUint8Array(input), base64Options);
}

// --- internal ---

function _readStreamToChunks(input: NodeStream): Promise<Uint8Array[]> {
  assertNodeStream(input);
  return new Promise((resolve, reject) => {
    const chunks: Uint8Array[] = [];
    input.on("data", (chunk: Uint8Array) => {
      chunks.push(chunk);
    });
    input.once("error", reject);
    input.once("end", () => {
      resolve(chunks);
    });
  });
}
