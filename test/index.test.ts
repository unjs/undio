import { expect, it, describe } from "vitest";
import { detectType } from "../src/detect";
import { convertTo } from "../src/convert";
import type { DataType, DataTypeName } from "../src/types";

const fixtures: Record<DataTypeName, DataType[]> = {
  ArrayBuffer: [new ArrayBuffer(1)],
  Base64: ["SGVsbG8sIFdvcmxkIQ=="],
  Base64Url: ["aHR0cDovLysvKz0"],
  Blob: [new Blob()],
  DataView: [new DataView(new ArrayBuffer(1))],
  NumberArray: [[]],
  ReadableStream: [new ReadableStream()],
  Response: [new Response()],
  String: ["string"],
  Uint8Array: [new Uint8Array()],
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
            ["Base64", "Base64Url"].includes(to)
              ? expect(detectType(output)).toBe("String")
              : expect(detectType(output)).toBe(to);
          });
        }
      });
    }
  }
});
