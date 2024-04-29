import type { Base64, Base64Options } from "../types";

type TestFn<T> = (input: unknown) => input is T;

export function assertType<T>(
  name: string,
  input: unknown,
  test: TestFn<T>,
): asserts input is T {
  if (!test(input)) {
    throw new TypeError(`Expected ${name} type but got ${typeof test}.`);
  }
}

export function _base64Encode(
  data: Uint8Array | string,
  opts?: Base64Options,
): Base64 {
  let encoded = btoa(
    typeof data === "string" ? data : String.fromCodePoint(...data),
  );
  if (opts?.urlSafe) {
    encoded = encoded
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return encoded;
}
