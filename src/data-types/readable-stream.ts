import { DataType } from "../types";
import { assertType, ConvertMap, convertTo } from "./_utils";

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
  // assertReadableStream(readableStream);
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
  assertReadableStream(readableStream);
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

const _convertMap: ConvertMap<ReadableStream> = {
  ArrayBuffer: readableStreamToArrayBuffer,
  Blob: readableStreamToBlob,
  DataView: readableStreamToDataView,
  NumberArray: readableStreamToNumberArray,
  ReadableStream: (input) => input,
  Response: readableStreamToResponse,
  String: readableStreamToString,
  Uint8Array: readableStreamToUint8Array,
} as const;

/**
 * Convert from any value to [readableStream][readableStream]
 * @group ReadableStream
 */
export const toreadableStream = (input: DataType) =>
  convertTo<ReadableStream>("readableStream", input, _convertMap);
