import { DataType } from "../types";
import { assertType, ConvertMap, convertTo } from "./_utils";

/**
 * Test if input is an instance of [Uint8Array][Uint8Array] and return `true` or `false`.
 * @group Uint8Array
 */
export function isUint8Array(input: any): input is Uint8Array {
  return input instanceof Uint8Array;
}

/**
 * Assert that input is an instance of [Uint8Array][Uint8Array] or throw a `TypeError`.
 * @group Uint8Array
 */
export const assertUint8Array = (input: unknown) =>
  assertType("Uint8Array", input, isUint8Array);

/**
 * Convert from [Uint8Array][Uint8Array] to [ArrayBuffer][ArrayBuffer]
 @group Uint8Array
 */
export function uint8ArrayToArrayBuffer(uint8Array: Uint8Array): ArrayBuffer {
  return uint8Array.buffer;
}

/**
 * Convert from [Uint8Array][Uint8Array] to [Blob][Blob]
 @group Uint8Array
 */
export function uint8ArrayToBlob(
  uint8Array: Uint8Array,
  options?: BlobPropertyBag,
): Blob {
  assertUint8Array(uint8Array);
  return new Blob([uint8Array], options);
}

/**
 * Convert from [Uint8Array][Uint8Array] to [DataView][DataView]
 @group Uint8Array
 */
export function uint8ArrayToDataView(uint8Array: Uint8Array): DataView {
  assertUint8Array(uint8Array);
  return new DataView(
    uint8Array.buffer,
    uint8Array.byteOffset,
    uint8Array.byteLength,
  );
}

/**
 * Convert from [Uint8Array][Uint8Array] to [Number Array][Number Array]
 @group Uint8Array
 */
export function uint8ArrayToNumberArray(uint8Array: Uint8Array): number[] {
  assertUint8Array(uint8Array);
  return [...uint8Array];
}

/**
 * Convert from [Uint8Array][Uint8Array] to [ReadableStream][ReadableStream]
 @group Uint8Array
 */
export function uint8ArrayToReadableStream(
  uint8Array: Uint8Array,
): ReadableStream<Uint8Array> {
  assertUint8Array(uint8Array);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(uint8Array);
      controller.close();
    },
  });
}

/**
 * Convert from [Uint8Array][Uint8Array] to [String][String]
 @group Uint8Array
 */
export function uint8ArrayToString(uint8Array: Uint8Array): string {
  assertUint8Array(uint8Array);
  return new TextDecoder().decode(uint8Array);
}

const _convertMap: ConvertMap<Uint8Array> = {
  ArrayBuffer: uint8ArrayToArrayBuffer,
  Blob: uint8ArrayToBlob,
  DataView: uint8ArrayToDataView,
  NumberArray: uint8ArrayToNumberArray,
  ReadableStream: uint8ArrayToReadableStream,
  String: uint8ArrayToString,
  Uint8Array: (input) => input,
} as const;

/**
 * Convert from any value to [Uint8Array][Uint8Array]
 * @group Uint8Array
 */
export const toUint8Array = (input: DataType) =>
  convertTo<Uint8Array>("Uint8Array", input, _convertMap);
