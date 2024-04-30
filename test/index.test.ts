import { describe, expect, it } from "vitest";
import {
  convertTo,
  toArrayBuffer,
  toBase64,
  toBlob,
  toDataView,
  toNumberArray,
  toReadableStream,
  toResponse,
  // biome-ignore lint: function name expected
  toString,
  toUint8Array,
} from "../src/convert";
import { detectType } from "../src/detect";
import type { DataType, DataTypeName } from "../src/types";

const fixtures: Record<DataTypeName, DataType[]> = {
  ArrayBuffer: [new ArrayBuffer(1)],
  Base64: ["SGVsbG8sIFdvcmxkIQ==", "aHR0cDovLysvKz0"],
  Blob: [new Blob()],
  DataView: [new DataView(new ArrayBuffer(1))],
  NumberArray: [[]],
  ReadableStream: [new ReadableStream()],
  Response: [new Response()],
  String: ["string"],
  Uint8Array: [new Uint8Array()],
};

const convertFunctions = {
  toArrayBuffer,
  toBlob,
  toDataView,
  toNumberArray,
  toReadableStream,
  toResponse,
  toString,
  toUint8Array,
  toBase64,
};

const typeNames = Object.keys(fixtures) as DataTypeName[];

describe("detectType", () => {
  for (const [typeName] of Object.entries(fixtures)) {
    describe.skipIf(typeName.startsWith("Base64"))(typeName, () => {
      for (const input of fixtures[typeName as DataTypeName]) {
        it(`should detect ${typeName} from ${input}`, () => {
          expect(detectType(input)).toBe(typeName);
        });
      }
    });
  }
});

describe("convertTo", () => {
  for (const from of typeNames) {
    for (const to of typeNames) {
      describe.skipIf(from === "ReadableStream")(`${from} to ${to}`, () => {
        for (const input of fixtures[from]) {
          it(`should convert ${from} to ${to}`, async () => {
            const output = await convertTo(to, input);
            expect(detectType(output)).toBe(to === "Base64" ? "String" : to);
          });
        }
      });
    }
  }
});

describe("toType", () => {
  for (const from of typeNames) {
    for (const to of typeNames) {
      describe.skipIf(from === "ReadableStream")(`${from} to ${to}`, () => {
        for (const input of fixtures[from]) {
          it(`should convert ${from} to ${to}`, async () => {
            const output = await convertFunctions[`to${to}`](input);
            expect(detectType(output)).toBe(to === "Base64" ? "String" : to);
          });
        }
      });
    }
  }
});

describe("base64 decoding", async () => {
  const base64Example = await convertTo("Base64", new Uint8Array([0, 1, 2, 3]));
  for (const to of typeNames) {
    describe(`Base64 to ${to}`, () => {
      it(`should convert Base64 to ${to}`, async () => {
        const encodedTo = await convertTo(to, base64Example, "Base64");
        const decoded = await convertTo("Uint8Array", encodedTo, to);
        expect(decoded).toEqual(new Uint8Array([0, 1, 2, 3]));
      });
    });
  }
});
