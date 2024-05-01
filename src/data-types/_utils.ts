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

export function _base64Encode(data: Uint8Array, opts?: Base64Options): Base64 {
  let encoded = btoa(String.fromCodePoint(...data));
  if (opts?.urlSafe) {
    encoded = encoded
      .replace(/\+/g, "-")
      .replace(/\//g, "_")
      .replace(/=+$/, "");
  }
  return opts?.dataURL === false
    ? encoded
    : `data:${opts?.type || ""};base64,${encoded}`;
}
