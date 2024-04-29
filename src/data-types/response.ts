import type { Base64, Base64Options } from "../types";
import { _base64Encode, assertType } from "./_utils";

/**
 * Test if input is an instance of [Response][Response] and return `true` or `false`.
 * @group Response
 */
export function isResponse(input: any): input is Response {
  return input instanceof Response;
}

/**
 * Assert that input is an instance of [Response][Response] or throw a `TypeError`.
 * @group Response
 */
export const assertResponse = (input: unknown) =>
  assertType("Response", input, isResponse);

/**
 * Convert from [Response][Response] to [ArrayBuffer][ArrayBuffer]
 * @group Response
 */
export function responseToArrayBuffer(
  response: Response,
): Promise<ArrayBuffer> {
  assertResponse(response);
  return response.arrayBuffer();
}

/**
 * Convert from [Response][Response] to [Blob][Blob]
 * @group Response
 */
export function responseToBlob(response: Response): Promise<Blob> {
  assertResponse(response);
  return response.blob();
}

/**
 * Convert from [Response][Response] to [DataView][DataView]
 * @group Response
 */
export async function responseToDataView(
  response: Response,
): Promise<DataView> {
  assertResponse(response);
  return new DataView(await response.arrayBuffer());
}

/**
 * Convert from [Response][Response] to [Number Array][Number Array]
 * @group Response
 */
export async function responseToNumberArray(
  response: Response,
): Promise<number[]> {
  assertResponse(response);
  return [...new Uint8Array(await response.arrayBuffer())];
}

/**
 * Convert from [Response][Response] to [ReadableStream]ReadableStream]
 * @group Response
 */
export function responseToReadableStream(response: Response): ReadableStream {
  assertResponse(response);
  return response.body || new ReadableStream();
}

/**
 * Convert from [Response][Response] to [String][String]
 * @group Response
 */
export function responseToString(response: Response): Promise<string> {
  assertResponse(response);
  return response.text();
}

/**
 * Convert from [Response][Response] to [Uint8Array][Uint8Array]
 * @group Response
 */
export async function responseToUint8Array(
  response: Response,
): Promise<Uint8Array> {
  assertResponse(response);
  return new Uint8Array(await response.arrayBuffer());
}

/**
 * Convert from [Response][Response] to [Base64][Base64]
 * @group Response
 */
export async function responseToBase64(
  response: Response,
  base64Options?: Base64Options,
): Promise<Base64> {
  assertResponse(response);
  return _base64Encode(
    new Uint8Array(await response.arrayBuffer()),
    base64Options,
  );
}
