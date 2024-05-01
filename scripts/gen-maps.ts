import { writeFileSync } from "node:fs";

const types = [
  "arrayBuffer",
  "base64",
  "blob",
  "dataView",
  "nodeStream",
  "numberArray",
  "readableStream",
  "response",
  "text",
  "uint8Array",
];

const importLines: string[] = [];
const code: string[] = [];

for (const to of types) {
  if (to === "nodeStream") {
    continue;
  }
  const toAssertName = `assert${upperFirst(to)}`;
  importLines.push(toAssertName);
  code.push(`export const _to${upperFirst(to)} = {`);
  for (const from of types) {
    if (to === from) {
      code.push(
        `  ${upperFirst(
          from,
        )}: (input: unknown) => (${toAssertName}(input), input),`,
      );
      continue;
    }
    const fnName = `${from}To${upperFirst(to)}`;
    importLines.push(fnName);
    code.push(`  ${upperFirst(from)}: ${fnName},`);
  }
  code.push("} as const;", "");
}

const genCode = `// Auto generated using gen-maps script
import {
  ${importLines.map((l) => `${l},`).join("\n  ")}
} from "./data-types";

${code.join("\n")}
export const _to = {
  ${types
    .filter((t) => t !== "nodeStream")
    .map((t) => `${upperFirst(t)}: _to${upperFirst(t)},`)
    .join("\n  ")}\n} as const;
`;

writeFileSync(
  new URL("../src/convert-maps.ts", import.meta.url),
  genCode,
  "utf8",
);

function upperFirst(str: string) {
  return str[0].toUpperCase() + str.slice(1);
}
