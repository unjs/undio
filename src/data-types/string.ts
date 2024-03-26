import { DataType } from "../types";
import { assertType, ConvertMap, convertTo } from "./_utils";

/**
 * Test if input is instance of [String][String] and return `true` or `false`.
 * @group String
 */
export function isString(input: any): input is string {
  return typeof input === "string";
}

/**
 * Assert that input is instance of [String][String] or throw a `TypeError`.
 * @group String
 */
export const assertString = (input: unknown) =>
  assertType("String", input, isString);

/**
 * Convert from [string][string] to [ArrayBuffer][ArrayBuffer]
 * @group String
 */
export function stringToArrayBuffer(string: string): ArrayBuffer {
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

/**
 * Convert from [string][string] to [Uint8Array][Uint8Array]
 * @group String
 */
export function stringToUint8Array(string: string): Uint8Array {
  assertString(string);
  return new Uint8Array(new TextEncoder().encode(string));
}

const _convertMap: ConvertMap<string> = {
  ArrayBuffer: stringToArrayBuffer,
  Blob: stringToBlob,
  DataView: stringToDataView,
  NumberArray: stringToNumberArray,
  ReadableStream: stringToReadableStream,
  String: (input) => input,
  Uint8Array: stringToUint8Array,
} as const;

/**
 * Convert from any value to [String][String]
 * @group String
 */
export const toString = (input: DataType) =>
  convertTo<string>("String", input, _convertMap);
