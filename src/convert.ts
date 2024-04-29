import { DataType, DataTypeName } from "./types";
import { detectType } from "./detect";
import {
  _toArrayBuffer,
  _toBlob,
  _toDataView,
  _toNumberArray,
  _toReadableStream,
  _toResponse,
  _toString,
  _toUint8Array,
  _to,
} from "./convert-maps";

/**
 * Convert from any value to any supported data type
 */
export function convertTo<T extends DataTypeName>(
  toType: T,
  input: DataType,
): any {
  const _map = _to[toType];
  if (!_map) {
    throw new Error(`Conversion to ${toType} is not supported.`);
  }
  const fromType = detectType(input);
  return _convertTo(fromType, input, _map);
}

/**
 * Convert from any value to [ArrayBuffer][ArrayBuffer]
 * @group ArrayBuffer
 */
export const toArrayBuffer = (input: DataType) =>
  _convertTo<ArrayBuffer>("ArrayBuffer", input, _toArrayBuffer);

/**
 * Convert from any value to [Blob][Blob]
 * @group Blob
 */
export const toBlob = (input: DataType) =>
  _convertTo<Blob>("Blob", input, _toBlob);

/**
 * Convert from any value to [DataView][DataView]
 * @group DataView
 */
export const toDataView = (input: DataType) =>
  _convertTo<DataView>("DataView", input, _toDataView);

/**
 * Convert from any value to [Number Array][Number Array]
 * @group NumberArray
 */
export const toNumberArray = (input: DataType) =>
  _convertTo<number[]>("NumberArray", input, _toNumberArray);

/**
 * Convert from any value to [ReadableStream][ReadableStream]
 * @group ReadableStream
 */
export const toReadableStream = (input: DataType) =>
  _convertTo<ReadableStream>("ReadableStream", input, _toReadableStream);

/**
 * Convert from any value to [Response][Response]
 * @group ReadableStream
 */
export const toResponse = (input: DataType) =>
  _convertTo<ReadableStream>("Response", input, _toResponse);

/**
 * Convert from any value to [String][String]
 * @group String
 */
export const toString = (input: DataType) =>
  _convertTo<string>("String", input, _toString);

/**
 * Convert from any value to [Uinit8Array][Uinit8Array]
 * @group Uinit8Array
 */
export const toUnit8Array = (input: DataType) =>
  _convertTo<string>("Uint8Array", input, _toUint8Array);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _convertTo<T extends DataType>(
  name: DataTypeName,
  input: DataType,
  map: Record<DataTypeName, any /* (input: DataType) => T */>,
) {
  const converter = map[name];
  if (converter === undefined) {
    throw new Error(`Conversion from ${name} is not supported.`);
  }
  return converter(input);
}
