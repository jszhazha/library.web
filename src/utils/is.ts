
export function is(val: unknown, type: string): boolean {
  return toString.call(val) === `[object ${type}]`;
}

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export function isNull(val: unknown): val is null {
  return val === null;
}

export function isBoolean(val: unknown): val is boolean {
  return is(val, 'Boolean');
}

export function isString(val: unknown): val is string {
  return is(val, 'String');
}
