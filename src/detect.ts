import {
  isArrayBuffer,
  isBlob,
  isDataView,
  isNumberArray,
  isReadableStream,
  isResponse,
  isString,
  isUint8Array,
} from "./data-types";

import type { DataType, DataTypeName } from "./types";

const detectors: [DataTypeName, (input: unknown) => boolean][] = [
  ["ArrayBuffer", isArrayBuffer],
  ["Blob", isBlob],
  ["DataView", isDataView],
  ["NumberArray", isNumberArray],
  ["ReadableStream", isReadableStream],
  ["Response", isResponse],
  ["String", isString],
  ["Uint8Array", isUint8Array],
];

export function detectType(input: DataType): DataTypeName {
  for (const [name, test] of detectors) {
    if (test(input)) {
      return name;
    }
  }
  throw new TypeError(`Unknown data type: ${typeof input}.`);
}
