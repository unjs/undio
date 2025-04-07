import { describe, expect, it } from "vitest";
import { _base64Encode } from "../src/data-types/_utils";

describe("_base64Encode", () => {
  it("should encode Uint8Array to base64 string", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const result = _base64Encode(data);
    expect(result).toBe("data:;base64,SGVsbG8=");
  });

  it("should encode Uint8Array to base64 URL safe string", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const result = _base64Encode(data, { urlSafe: true });
    expect(result).toBe("data:;base64,SGVsbG8");
  });

  it("should encode Uint8Array to base64 not dataURL", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const result = _base64Encode(data, { dataURL: false });
    expect(result).toBe("SGVsbG8=");
  });

  it("should encode Uint8Array to base64 with custom type", () => {
    const data = new Uint8Array([72, 101, 108, 108, 111]);
    const result = _base64Encode(data, { type: "text/plain" });
    expect(result).toBe("data:text/plain;base64,SGVsbG8=");
  });
});
