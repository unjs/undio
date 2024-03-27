import { assertType } from "./_utils";

/**
 * Test if input is an instance of [DataView][DataView] and return `true` or `false`.
 * @group DataView
 */
export function isDataView(input: any): input is DataView {
  return input instanceof DataView;
}

/**
 * Assert that input is an instance of [DataView][DataView] or throw a `TypeError`.
 * @group DataView
 */
export const assertDataView = (input: unknown) =>
  assertType("DataView", input, isDataView);

/**
 * Convert from [DataView][DataView] to [ArrayBuffer][ArrayBuffer]
 * @group DataView
 */
export function dataViewToArrayBuffer(dataView: DataView): ArrayBuffer {
  return dataView.buffer;
}

/**
 * Convert from [DataView][DataView] to [Blob][Blob]
 * @group DataView
 */
export function dataViewToBlob(
  dataView: DataView,
  options?: BlobPropertyBag,
): Blob {
  assertDataView(dataView);
  return new Blob([dataView.buffer], options);
}

/**
 * Convert from [DataView][DataView] to [Number Array][Number Array]
 * @group DataView
 */
export function dataViewToNumberArray(dataView: DataView): number[] {
  assertDataView(dataView);
  return [...new Uint8Array(dataView.buffer)];
}

/**
 * Convert from [DataView][DataView] to [ReadableStream][ReadableStream]
 * @group DataView
 */
export function dataViewToReadableStream(
  dataView: DataView,
): ReadableStream<Uint8Array> {
  assertDataView(dataView);
  return new ReadableStream({
    start(controller) {
      controller.enqueue(new Uint8Array(dataView.buffer));
      controller.close();
    },
  });
}

/**
 * Convert from [DataView][DataView] to [String][String]
 * @group DataView
 */
export function dataViewToString(dataView: DataView): string {
  assertDataView(dataView);
  return new TextDecoder().decode(dataView);
}

/**
 * Convert from [DataView][DataView] to [Response][Response]
 * @group DataView
 */
export function dataViewToResponse(
  dataView: DataView,
  init?: ResponseInit,
): Response {
  assertDataView(dataView);
  return new Response(dataView.buffer, init);
}

/**
 * Convert from [DataView][DataView] to [Uint8Array][Uint8Array]
 * @group DataView
 */
export function dataViewToUint8Array(dataView: DataView): Uint8Array {
  assertDataView(dataView);
  return new Uint8Array(
    dataView.buffer,
    dataView.byteOffset,
    dataView.byteLength,
  );
}
