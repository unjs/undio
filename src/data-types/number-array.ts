import { DataType } from "../types";
import { assertType, ConvertMap, convertTo } from "./_utils";

/**
 * Test if input is an instance of [Number Array][Number Array] and return `true` or `false`.
 * @group NumberArray
 */
export function isNumberArray(input: any): input is number[] {
  return (
    Array.isArray(input) && (input.length === 0 || typeof input[0] === "number")
  );
}

/**
 * Assert that input is an instance of [Number Array][Number Array] or throw a `TypeError`.
 * @group NumberArray
 */
export const assertNumberArray = (input: unknown) =>
  assertType("NumberArray", input, isNumberArray);
/**
 * Convert from [Number Array][Number Array] to [ArrayBuffer][ArrayBuffer]
 * @group NumberArray
 */
export function numberArrayToArrayBuffer(numberArray: number[]): ArrayBuffer {
  return new Uint8Array(numberArray).buffer;
}

/**
 * Convert from [Number Array][Number Array] to [Blob][Blob]
 * @group NumberArray
 */
export function numberArrayToBlob(
  numberArray: number[],
  options?: BlobPropertyBag,
): Blob {
  assertNumberArray(numberArray);
  return new Blob([new Uint8Array(numberArray)], options);
}

/**
 * Convert from [Number Array][Number Array] to [DataView][DataView]
 * @group NumberArray
 */
export function numberArrayToDataView(numberArray: number[]): DataView {
  assertNumberArray(numberArray);
  return new DataView(new Uint8Array(numberArray).buffer);
}

/**
 * Convert from [Number Array][Number Array] to [ReadableStream][ReadableStream]
 * @group NumberArray
 */
export function numberArrayToReadableStream(
  numberArray: number[],
): ReadableStream<Uint8Array> {
  assertNumberArray(numberArray);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(numberArray));
      controller.close();
    },
  });
}

/**
 * Convert from [Number Array][Number Array] to [String][String]
 * @group NumberArray
 */
export function numberArrayToString(numberArray: number[]): string {
  assertNumberArray(numberArray);
  return new TextDecoder().decode(new Uint8Array(numberArray));
}

/**
 * Convert from [Number Array][Number Array] to [Uint8Array][Uint8Array]
 * @group NumberArray
 */
export function numberArrayToUint8Array(numberArray: number[]): Uint8Array {
  assertNumberArray(numberArray);
  return new Uint8Array(numberArray);
}

const _convertMap: ConvertMap<number[]> = {
  ArrayBuffer: numberArrayToArrayBuffer,
  Blob: numberArrayToBlob,
  DataView: numberArrayToDataView,
  NumberArray: (input) => input,
  ReadableStream: numberArrayToReadableStream,
  String: numberArrayToString,
  Uint8Array: numberArrayToUint8Array,
} as const;

/**
 * Convert from any value to [numberArray][numberArray]
 * @group numberArray
 */
export const tonumberArray = (input: DataType) =>
  convertTo<number[]>("numberArray", input, _convertMap);
