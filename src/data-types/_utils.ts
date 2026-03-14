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
  // Process in chunks to avoid "Maximum call stack size exceeded" when data is
  // large (e.g. PDFs, images). Spreading a huge array as function arguments
  // exhausts the JS engine's call-stack argument limit (~65 536 args).
  const CHUNK_SIZE = 0xff_ff;
  let str = "";
  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    str += String.fromCodePoint(...data.subarray(i, i + CHUNK_SIZE));
  }
  let encoded = btoa(str);
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
