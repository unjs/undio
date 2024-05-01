import {
  isArrayBuffer,
  isBase64DataURL,
  isBlob,
  isDataView,
  isNodeStream,
  isNumberArray,
  isReadableStream,
  isResponse,
  isText,
  isUint8Array,
} from "./data-types";

import type { DataType, DataTypeName } from "./types";

const detectors: [DataTypeName, (input: unknown) => boolean][] = [
  //Instanceof checkers
  ["Uint8Array", isUint8Array],
  ["ArrayBuffer", isArrayBuffer],
  ["Blob", isBlob],
  ["DataView", isDataView],
  ["ReadableStream", isReadableStream],
  ["Response", isResponse],
  // More checkers
  ["NodeStream", isNodeStream],
  ["NumberArray", isNumberArray],
  ["Base64", isBase64DataURL],
  ["Text", isText],
];

export function detectType(input: DataType): DataTypeName {
  for (const [name, test] of detectors) {
    if (test(input)) {
      return name;
    }
  }
  throw new TypeError(`Unknown data type: ${typeof input}.`);
}
