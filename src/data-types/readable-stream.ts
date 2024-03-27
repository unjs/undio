import { assertType } from "./_utils";

/**
 * Test if input is an instance of [ReadableStream][ReadableStream] and return `true` or `false`.
 * @group ReadableStream
 */
export function isReadableStream(input: any): input is ReadableStream {
  return input instanceof ReadableStream;
}

/**
 * Assert that input is an instance of [ReadableStream][ReadableStream] or throw a `TypeError`.
 * @group ReadableStream
 */
export const assertReadableStream = (input: unknown) =>
  assertType("ReadableStream", input, isReadableStream);

/**
 * Convert from [ReadableStream][ReadableStream] to [ArrayBuffer][ArrayBuffer]
 * @group ReadableStream
 */
export async function readableStreamToArrayBuffer(
  readableStream: ReadableStream,
): Promise<ArrayBuffer> {
  if (globalThis.Bun?.readableStreamToArrayBuffer) {
    assertReadableStream(readableStream);
    return globalThis.Bun.readableStreamToArrayBuffer(readableStream);
  }
  const blob = await readableStreamToBlob(readableStream);
  return blob.arrayBuffer();
}

/**
 * Convert from [ReadableStream][ReadableStream] to [Blob][Blob]
 * @group ReadableStream
 */
export async function readableStreamToBlob(
  readableStream: ReadableStream,
  options?: BlobPropertyBag,
): Promise<Blob> {
  if (globalThis.Bun?.readableStreamToBlob) {
    assertReadableStream(readableStream);
    return globalThis.Bun.readableStreamToBlob(readableStream);
  }
  const reader = readableStream.getReader();
  const chunks: Uint8Array[] = [];
  while (true) {
    const { done, value } = await reader.read();
    if (done) {
      break;
    }
    chunks.push(value);
  }
  return new Blob(chunks, options);
}

/**
 * Convert from [ReadableStream][ReadableStream] to [DataView][DataView]
 * @group ReadableStream
 */
export async function readableStreamToDataView(
  readableStream: ReadableStream,
): Promise<DataView> {
  // assertReadableStream(readableStream);
  return new DataView(await readableStreamToArrayBuffer(readableStream));
}

/**
 * Convert from [ReadableStream][ReadableStream] to [Number Array][Number Array]
 * @group ReadableStream
 */
export async function readableStreamToNumberArray(
  readableStream: ReadableStream,
): Promise<number[]> {
  if (globalThis.Bun?.readableStreamToArray) {
    assertReadableStream(readableStream);
    return globalThis.Bun.readableStreamToArray(readableStream);
  }
  // assertReadableStream(readableStream);
  return [...(await readableStreamToUint8Array(readableStream))];
}

/**
 * Convert from [ReadableStream][ReadableStream] to [String][String]
 * @group ReadableStream
 */
export async function readableStreamToString(
  readableStream: ReadableStream,
): Promise<string> {
  if (globalThis.Bun?.readableStreamToText) {
    assertReadableStream(readableStream);
    return globalThis.Bun.readableStreamToText(readableStream);
  }
  // assertReadableStream(readableStream);
  const blob = await readableStreamToBlob(readableStream);
  return blob.text();
}

/**
 * Convert from [ReadableStream][ReadableStream] to [Response][Response]
 */
export function readableStreamToResponse(
  readableStream: ReadableStream,
  init?: ResponseInit,
): Response {
  assertReadableStream(readableStream);
  return new Response(readableStream, init);
}

/**
 * Convert from [ReadableStream][ReadableStream] to [Uint8Array][Uint8Array]
 * @group ReadableStream
 */
export async function readableStreamToUint8Array(
  readableStream: ReadableStream,
): Promise<Uint8Array> {
  // assertReadableStream(readableStream);
  const arrayBuffer = await readableStreamToArrayBuffer(readableStream);
  return new Uint8Array(arrayBuffer);
}
