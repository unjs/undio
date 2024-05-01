import { Readable } from "node:stream";
import { describe, expect, it } from "vitest";
import {
  convertTo,
  detectType,
  toArrayBuffer,
  toBase64,
  toBlob,
  toDataView,
  toNumberArray,
  toReadableStream,
  toResponse,
  toText,
  toUint8Array,
  uint8ArrayToText,
} from "../src";
import type { DataType, DataTypeName } from "../src/types";

const fixtureText = "Hello, World 🥳";
const fixtureByes = new TextEncoder().encode(fixtureText);

const fixtures: Record<DataTypeName, () => DataType> = {
  ArrayBuffer: () => fixtureByes.buffer,
  Base64: () =>
    "data:text/plain;base64," + btoa(String.fromCodePoint(...fixtureByes)),
  Blob: () => new Blob([fixtureByes]),
  DataView: () => new DataView(fixtureByes.buffer),
  NumberArray: () => [...fixtureByes],
  ReadableStream: () =>
    new Response(fixtureText).body as ReadableStream<Uint8Array>,
  Response: () => new Response(fixtureText),
  Text: () => fixtureText,
  Uint8Array: () => new Uint8Array(fixtureByes),
  NodeStream: () => {
    const s = new Readable();
    s.push(fixtureText);
    s.push(null); // eslint-disable-line unicorn/no-null
    return s;
  },
};

const typeNames = Object.keys(fixtures) as DataTypeName[];

const convertFunctions = {
  toArrayBuffer,
  toBlob,
  toDataView,
  toNumberArray,
  toReadableStream,
  toResponse,
  toText,
  toUint8Array,
  toBase64,
};

describe("detectType", () => {
  for (const typeName of typeNames) {
    describe(typeName, () => {
      const input = fixtures[typeName]();
      it(`should detect ${typeName} from ${input}`, () => {
        expect(detectType(input)).toBe(typeName);
      });
    });
  }
});

describe("convertTo", () => {
  for (const from of typeNames) {
    for (const to of typeNames) {
      if (to === "NodeStream") continue;
      describe(`${from} to ${to}`, () => {
        const input = fixtures[from]();
        it(`should convert ${from} to ${to}`, async () => {
          const output = await convertTo(to, input);
          expect(detectType(output)).toBe(to);
        });
      });
    }
  }
});

describe("toType", () => {
  for (const from of typeNames) {
    for (const to of typeNames) {
      if (to === "NodeStream") continue;
      describe(`${from} to ${to}`, () => {
        const input = fixtures[from]();
        it(`should convert ${from} to ${to}`, async () => {
          const output = await convertFunctions[`to${to}`](input);
          expect(detectType(output)).toBe(to);
        });
      });
    }
  }
});

it("not supported", () => {
  // @ts-expect-error
  expect(() => convertTo("Bob", new Uint8Array())).toThrow();

  // @ts-expect-error
  expect(() => convertTo("Uint8Array", new Uint8Array(), "BoB")).toThrow();

  // @ts-expect-error
  expect(() => detectType(new Error("..."))).toThrow();

  // @ts-expect-error
  expect(() => uint8ArrayToText("BoB")).toThrow();
});

describe("Base64", async () => {
  const base64Example = await convertTo("Base64", new Uint8Array([0, 1, 2, 3]));
  for (const to of typeNames) {
    if (to === "NodeStream") continue;
    describe(`Base64 to ${to}`, () => {
      it(`should convert Base64 to ${to}`, async () => {
        const encodedTo = await convertTo(to, base64Example, "Base64");
        const decoded = await convertTo("Uint8Array", encodedTo, to);
        expect(decoded).toEqual(new Uint8Array([0, 1, 2, 3]));
      });
    });
  }
});
