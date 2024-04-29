# ⇔ undio

<!-- automd:badges color=yellow bundlejs codecov -->

[![npm version](https://img.shields.io/npm/v/undio?color=yellow)](https://npmjs.com/package/undio)
[![npm downloads](https://img.shields.io/npm/dm/undio?color=yellow)](https://npmjs.com/package/undio)
[![bundle size](https://img.shields.io/bundlejs/size/undio?color=yellow)](https://bundlejs.com/?q=undio)
[![codecov](https://img.shields.io/codecov/c/gh/unjs/undio?color=yellow)](https://codecov.io/gh/unjs/undio)

<!-- /automd -->

⇔ Conventionally and safely convert between various JavaScript data types.

## ✅ Features

- Type-safe usage
- Runtime-type safety assertion
- Auto type detection and conversion
- Tree-shakable and compact build
- Leverage runtime native performance ([+Bun stream utils](https://bun.sh/docs/api/utils#bun-readablestreamto))

## 👍 Supported Types

- [ArrayBuffer][ArrayBuffer]
- [Base64][Base64]
- [Blob][Blob]
- [DataView][DataView]
- [Number Array][Number Array]
- [ReadableStream][ReadableStream]
- [Response][Response]
- [String][String]
- [Uint8Array][Uint8Array]

## Usage

Install package:

<!-- automd:pm-install -->

```sh
# ✨ Auto-detect
npx nypm install undio

# npm
npm install undio

# yarn
yarn add undio

# pnpm
pnpm install undio

# bun
bun install undio
```

<!-- /automd -->

Import:

<!-- automd:jsimport cjs cdn imports="" -->

**ESM** (Node.js, Bun)

```js
import {} from "undio";
```

**CommonJS** (Legacy Node.js)

```js
const {} = require("undio");
```

**CDN** (Deno, Bun and Browsers)

```js
import {} from "https://esm.sh/undio";
```

<!-- /automd -->

## Auto Convert

Undio automatically detects the input type and uses the proper method to convert it to the expected type.

**Example:**

```ts
import { detectType, toString, toReadableStream } from "undio";

// Convert any supported type (auto-detected)
const string = await toString(value);
const stream = await toReadableStream(value);

// "ArrayBuffer" | "Blob"| "DataView" | "NumberArray" | "ReadableStream" | "String" | "Uint8Array";
const type = detectType(value);
```

> [!NOTE]
> Because of stream support, the return type can be a promise. Always make sure to use an `await` before them.

> [!NOTE]
> Alternatively you can use low-level `*To*(value)` utils to explicitly convert from one type to another. See [all utils](#all-utils) section.

## Runtime type checking

You can use `is*(input)` and `assert*(input)` utils to validate input type.

> [!NOTE]
> All conversion utilities use assertions for runtime type safety by default, so you don't need to manually do this.

**Example:**

```ts
import { isReadableStream, assertArrayBuffer } from "undio";

if (isReadableStream(value)) {
  /* do something */
}

assertArrayBuffer(value); // Throws an error if value is not ArrayBuffer
// do something
```

## All utils

<details>

<summary>See all utils</summary>

<!-- automd:jsdocs src="./src/index.ts" -->

## Array Buffer

### `arrayBufferToBase64(arrayBuffer, base64Options)`

Convert from [ArrayBuffer][ArrayBuffer] to [Base64][Base64]

### `arrayBufferToBlob(arrayBuffer, options?)`

Convert from [ArrayBuffer][ArrayBuffer] to [Blob][Blob]

### `arrayBufferToDataView(arrayBuffer)`

Convert from [ArrayBuffer][ArrayBuffer] to [DataView][DataView]

### `arrayBufferToNumberArray(arrayBuffer)`

Convert from [ArrayBuffer][ArrayBuffer] to [Number Array][Number Array]

### `arrayBufferToReadableStream(arrayBuffer)`

Convert from [ArrayBuffer][ArrayBuffer] to [ReadableStream][ReadableStream]

### `arrayBufferToResponse(arrayBuffer, init?)`

Convert from [ArrayBuffer][ArrayBuffer] to [Response][Response]

### `arrayBufferToString(arrayBuffer)`

Convert from [ArrayBuffer][ArrayBuffer] to [String][String]

### `arrayBufferToUint8Array(arrayBuffer)`

Convert from [ArrayBuffer][ArrayBuffer] to [Uint8Array][Uint8Array]

### `assertArrayBuffer(input)`

Assert that input is an instance of [ArrayBuffer][ArrayBuffer] or throw a `TypeError`.

### `isArrayBuffer(input)`

Test if input is an instance of [ArrayBuffer][ArrayBuffer] and return `true` or `false`.

### `toArrayBuffer(input)`

Convert from any value to [ArrayBuffer][ArrayBuffer]

## Base64

### `assertBase64(input, opts?)`

Assert that input is an instance of [String][String] and matches the [Base64][Base64] pattern or throw a `TypeError`.

### `base64ToArrayBuffer(string, base64Options?)`

Convert from [Base64][Base64] to [ArrayBuffer][ArrayBuffer]

### `base64ToBlob(string, opts?)`

Convert from [Base64][Base64] to [Blob][Blob]

### `base64ToDataView(string, base64Options?)`

Convert from [Base64][Base64] to [DataView][DataView]

### `base64ToNumberArray(string, base64Options?)`

Convert from [Base64][Base64] to [Number Array][Number Array]

### `base64ToReadableStream(string, base64Options?)`

Convert from [Base64][Base64] to [ReadableStream][ReadableStream]

### `base64ToResponse(string)`

Convert from [Base64][Base64] to [Response][Response]

### `base64ToString(string, opts?)`

Convert from [Base64][Base64] to [String][String]

### `base64ToUint8Array(string, base64Options?)`

Convert from [Base64][Base64] to [Uint8Array][Uint8Array]

### `isBase64(input, base64Options?)`

Test if input is string and matches the [Base64][Base64] pattern and return `true` or `false`.

### `toBase64(input)`

Convert from any value to [Base64][Base64]

## Blob

### `assertBlob(input)`

Assert that input is an instance of [Blob][Blob] or throw a `TypeError`.

### `blobToArrayBuffer(blob)`

Convert from [Blob][Blob] to [ArrayBuffer][ArrayBuffer]

### `blobToBase64(blob, base64Options)`

Convert from [Blob][Blob] to [Base64][Base64]

### `blobToDataView(blob)`

Convert from [Blob][Blob] to [DataView][DataView]

### `blobToNumberArray(blob)`

Convert from [Blob][Blob] to [Number Array][Number Array]

### `blobToReadableStream(blob)`

Convert from [Blob][Blob] to [ReadableStream][ReadableStream]

### `blobToResponse(blob, init?)`

Convert from [Blob][Blob] to [Response][Response]

### `blobToString(blob)`

Convert from [Blob][Blob] to [String][String]

### `blobToUint8Array(blob)`

Convert from [Blob][Blob] to [Uint8Array][Uint8Array]

### `isBlob(input)`

Test if input is an instance of [Blob][Blob] and return `true` or `false`.

### `toBlob(input)`

Convert from any value to [Blob][Blob]

## Data View

### `assertDataView(input)`

Assert that input is an instance of [DataView][DataView] or throw a `TypeError`.

### `dataViewToArrayBuffer(dataView)`

Convert from [DataView][DataView] to [ArrayBuffer][ArrayBuffer]

### `dataViewToBase64(dataView, base64Options?)`

Convert from [DataView][DataView] to [Base64][Base64]

### `dataViewToBlob(dataView, options?)`

Convert from [DataView][DataView] to [Blob][Blob]

### `dataViewToNumberArray(dataView)`

Convert from [DataView][DataView] to [Number Array][Number Array]

### `dataViewToReadableStream(dataView)`

Convert from [DataView][DataView] to [ReadableStream][ReadableStream]

### `dataViewToResponse(dataView, init?)`

Convert from [DataView][DataView] to [Response][Response]

### `dataViewToString(dataView)`

Convert from [DataView][DataView] to [String][String]

### `dataViewToUint8Array(dataView)`

Convert from [DataView][DataView] to [Uint8Array][Uint8Array]

### `isDataView(input)`

Test if input is an instance of [DataView][DataView] and return `true` or `false`.

### `toDataView(input)`

Convert from any value to [DataView][DataView]

## Number Array

### `assertNumberArray(input)`

Assert that input is an instance of [Number Array][Number Array] or throw a `TypeError`.

### `isNumberArray(input)`

Test if input is an instance of [Number Array][Number Array] and return `true` or `false`.

### `numberArrayToArrayBuffer(numberArray)`

Convert from [Number Array][Number Array] to [ArrayBuffer][ArrayBuffer]

### `numberArrayToBase64(numberArray, base64Options?)`

Convert from [Number Array][Number Array] to [Base64][Base64]

### `numberArrayToBlob(numberArray, options?)`

Convert from [Number Array][Number Array] to [Blob][Blob]

### `numberArrayToDataView(numberArray)`

Convert from [Number Array][Number Array] to [DataView][DataView]

### `numberArrayToReadableStream(numberArray)`

Convert from [Number Array][Number Array] to [ReadableStream][ReadableStream]

### `numberArrayToString(numberArray)`

Convert from [Number Array][Number Array] to [String][String]

### `numberArrayToUint8Array(numberArray)`

Convert from [Number Array][Number Array] to [Uint8Array][Uint8Array]

### `toNumberArray(input)`

Convert from any value to [Number Array][Number Array]

## Readable Stream

### `assertReadableStream(input)`

Assert that input is an instance of [ReadableStream][ReadableStream] or throw a `TypeError`.

### `isReadableStream(input)`

Test if input is an instance of [ReadableStream][ReadableStream] and return `true` or `false`.

### `readableStreamToArrayBuffer(readableStream)`

Convert from [ReadableStream][ReadableStream] to [ArrayBuffer][ArrayBuffer]

### `readableStreamToBase64(readableStream, base64Options?)`

Convert from [ReadableStream][ReadableStream] to [Base64][Base64]

### `readableStreamToBlob(readableStream, options?)`

Convert from [ReadableStream][ReadableStream] to [Blob][Blob]

### `readableStreamToDataView(readableStream)`

Convert from [ReadableStream][ReadableStream] to [DataView][DataView]

### `readableStreamToNumberArray(readableStream)`

Convert from [ReadableStream][ReadableStream] to [Number Array][Number Array]

### `readableStreamToString(readableStream)`

Convert from [ReadableStream][ReadableStream] to [String][String]

### `readableStreamToUint8Array(readableStream)`

Convert from [ReadableStream][ReadableStream] to [Uint8Array][Uint8Array]

### `toReadableStream(input)`

Convert from any value to [ReadableStream][ReadableStream]

### `toResponse(input)`

Convert from any value to [Response][Response]

## Response

### `assertResponse(input)`

Assert that input is an instance of [Response][Response] or throw a `TypeError`.

### `isResponse(input)`

Test if input is an instance of [Response][Response] and return `true` or `false`.

### `responseToArrayBuffer(response)`

Convert from [Response][Response] to [ArrayBuffer][ArrayBuffer]

### `responseToBase64(response, base64Options?)`

Convert from [Response][Response] to [Base64][Base64]

### `responseToBlob(response)`

Convert from [Response][Response] to [Blob][Blob]

### `responseToDataView(response)`

Convert from [Response][Response] to [DataView][DataView]

### `responseToNumberArray(response)`

Convert from [Response][Response] to [Number Array][Number Array]

### `responseToReadableStream(response)`

Convert from [Response][Response] to [ReadableStream]ReadableStream]

### `responseToString(response)`

Convert from [Response][Response] to [String][String]

### `responseToUint8Array(response)`

Convert from [Response][Response] to [Uint8Array][Uint8Array]

## String

### `assertString(input)`

Assert that input is an instance of [String][String] or throw a `TypeError`.

### `isString(input)`

Test if input is an instance of [String][String] and return `true` or `false`.

### `stringToArrayBuffer(string)`

Convert from [string][string] to [ArrayBuffer][ArrayBuffer]

### `stringToBase64(string, opts?)`

Convert from [string][string] to [Base64][Base64]

### `stringToBlob(string, options?)`

Convert from [string][string] to [Blob][Blob]

### `stringToDataView(string)`

Convert from [string][string] to [DataView][DataView]

### `stringToNumberArray(string)`

Convert from [string][string] to [Number Array][Number Array]

### `stringToReadableStream(string)`

Convert from [string][string] to [ReadableStream][ReadableStream]

### `stringToUint8Array(string)`

Convert from [string][string] to [Uint8Array][Uint8Array]

## Uint8 Array

### `assertUint8Array(input)`

Assert that input is an instance of [Uint8Array][Uint8Array] or throw a `TypeError`.

### `isUint8Array(input)`

Test if input is an instance of [Uint8Array][Uint8Array] and return `true` or `false`.

### `toUint8Array(input)`

Convert from any value to [Uint8Array][Uint8Array]

### `uint8ArrayToArrayBuffer(uint8Array)`

Convert from [Uint8Array][Uint8Array] to [ArrayBuffer][ArrayBuffer]

### `uint8ArrayToBase64(uint8Array, base64Options?)`

Convert from [Uint8Array][Uint8Array] to [Base64][Base64]

### `uint8ArrayToBlob(uint8Array, options?)`

Convert from [Uint8Array][Uint8Array] to [Blob][Blob]

### `uint8ArrayToDataView(uint8Array)`

Convert from [Uint8Array][Uint8Array] to [DataView][DataView]

### `uint8ArrayToNumberArray(uint8Array)`

Convert from [Uint8Array][Uint8Array] to [Number Array][Number Array]

### `uint8ArrayToReadableStream(uint8Array)`

Convert from [Uint8Array][Uint8Array] to [ReadableStream][ReadableStream]

### `uint8ArrayToResponse(uint8Array, init?)`

Convert from [Uint8Array][Uint8Array] to [Response][Response]

### `uint8ArrayToString(uint8Array)`

Convert from [Uint8Array][Uint8Array] to [String][String]

### `convertTo(toType, input, fromType?)`

Convert from any value to any supported data type

### `detectType(input)`

### `numberArrayToResponse(numberArray, init?)`

Convert from [Number Array][Number Array] to [Response][Response]

### `readableStreamToResponse(readableStream, init?)`

Convert from [ReadableStream][ReadableStream] to [Response][Response]

### `stringToResponse(string, init?)`

<!-- /automd -->

</details>

## Development

<details>

<summary>local development</summary>

- Clone this repository
- Install the latest LTS version of [Node.js](https://nodejs.org/en/)
- Enable [Corepack](https://github.com/nodejs/corepack) using `corepack enable`
- Install dependencies using `pnpm install`
- Run interactive tests using `pnpm dev`

</details>

## License

<!-- automd:contributors license=MIT -->

Published under the [MIT](https://github.com/unjs/undio/blob/main/LICENSE) license.
Made by [community](https://github.com/unjs/undio/graphs/contributors) 💛
<br><br>
<a href="https://github.com/unjs/undio/graphs/contributors">
<img src="https://contrib.rocks/image?repo=unjs/undio" />
</a>

<!-- /automd -->

<!-- automd:with-automd -->

---

_🤖 auto updated with [automd](https://automd.unjs.io)_

<!-- /automd -->

[ArrayBuffer]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/ArrayBuffer
[Base64]: https://developer.mozilla.org/en-US/docs/Glossary/Base64
[Blob]: https://developer.mozilla.org/en-US/docs/Web/API/Blob
[DataView]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView
[Number Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array
[ReadableStream]: https://developer.mozilla.org/en-US/docs/Web/API/ReadableStream
[Response]: https://developer.mozilla.org/en-US/docs/Web/API/Response
[String]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String
[Uint8Array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Uint8Array
