import {
  _to,
  _toArrayBuffer,
  _toBase64,
  _toBlob,
  _toDataView,
  _toNumberArray,
  _toReadableStream,
  _toResponse,
  _toString,
  _toUint8Array,
} from "./convert-maps";
import { detectType } from "./detect";
import type { Base64, DataType, DataTypeMap, DataTypeName } from "./types";

/**
 * Convert from any value to any supported data type
 * @param toType - The target data type
 * @param input - The input value
 * @param fromType - The source data type (optional)
 */
export function convertTo<T extends DataTypeName>(
  toType: T,
  input: DataType,
  fromType?: DataTypeName,
): DataTypeMap<T> {
  const _map = _to[toType];
  if (!_map) {
    throw new Error(`Conversion to ${toType} is not supported.`);
  }
  return _convertTo(input, _map, fromType || detectType(input));
}

/**
 * Convert from any value to [ArrayBuffer][ArrayBuffer]
 * @group ArrayBuffer
 */
export const toArrayBuffer = (input: DataType) =>
  _convertTo<ArrayBuffer>(input, _toArrayBuffer);

/**
 * Convert from any value to [Blob][Blob]
 * @group Blob
 */
export const toBlob = (input: DataType) => _convertTo<Blob>(input, _toBlob);

/**
 * Convert from any value to [DataView][DataView]
 * @group DataView
 */
export const toDataView = (input: DataType) =>
  _convertTo<DataView>(input, _toDataView);

/**
 * Convert from any value to [Number Array][Number Array]
 * @group NumberArray
 */
export const toNumberArray = (input: DataType) =>
  _convertTo<number[]>(input, _toNumberArray);

/**
 * Convert from any value to [ReadableStream][ReadableStream]
 * @group ReadableStream
 */
export const toReadableStream = (input: DataType) =>
  _convertTo<ReadableStream>(input, _toReadableStream);

/**
 * Convert from any value to [Response][Response]
 * @group ReadableStream
 */
export const toResponse = (input: DataType) =>
  _convertTo<ReadableStream>(input, _toResponse);

/**
 * Convert from any value to [String][String]
 * @group String
 */
// biome-ignore lint: function name expected
export const toString = (input: DataType) =>
  _convertTo<string>(input, _toString);

/**
 * Convert from any value to [Uint8Array][Uint8Array]
 * @group Uint8Array
 */
export const toUint8Array = (input: DataType) =>
  _convertTo<string>(input, _toUint8Array);

/**
 * Convert from any value to [Base64][Base64]
 * @group Base64
 */
export const toBase64 = (input: DataType) =>
  _convertTo<Base64>(input, _toBase64);

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function _convertTo<T extends DataType>(
  input: DataType,
  map: Record<DataTypeName, unknown /* (input: DataType) => T */>,
  fromType?: DataTypeName,
) {
  const typeName = fromType || detectType(input);
  const converter = map[typeName];
  if (converter === undefined) {
    throw new Error(`Conversion from ${typeName} is not supported.`);
  }
  // @ts-ignore
  return converter(input);
}
