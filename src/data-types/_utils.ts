import { detectType } from "../detect";
import { DataTypeName, DataType } from "../types";
import {} from "./array-buffer";

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

type DataNameToType = Record<DataTypeName, DataType>;
export type ConvertMap<FROM extends DataType> = {
  [TO in DataTypeName]: (
    input: FROM,
  ) => DataNameToType[TO] | Promise<DataNameToType[TO]>;
};

export function convertTo<T extends DataType>(
  name: string,
  input: DataType,
  convertMap: ConvertMap<T>,
) {
  const typeName = detectType(input);
  if (typeName in convertMap) {
    return convertMap[typeName](input as T);
  }
  throw new TypeError(`Cannot convert ${typeName} to ${name}.`);
}
