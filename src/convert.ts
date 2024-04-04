import { Base64, Base64Url, DataType, DataTypeName } from "./types";
import { detectType } from "./detect";
import {
  _toArrayBuffer,
  _toBase64,
  _toBase64Url,
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
 * @param toType - The target data type
 * @param input - The input value
 * @param fromType - The source data type (optional)
 */
export function convertTo<T extends DataTypeName>(
  toType: T,
  input: DataType,
  fromType?: DataTypeName,
): any {
  const _map = _to[toType];
  if (!_map) {
    throw new Error(`Conversion to ${toType} is not supported.`);
  }
  return _convertTo(fromType || detectType(input), input, _map);
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

/**
 * Convert from any value to [Base64][Base64]
 * @group Base64
 */
export const toBase64 = (input: DataType) =>
  _convertTo<Base64>("Base64", input, _toBase64);

/**
 * Convert from any value to [Base64Url][Base64]
 * @group Base64Url
 */
export const toBase64Url = (input: DataType) =>
  _convertTo<Base64Url>("Base64Url", input, _toBase64Url);

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
