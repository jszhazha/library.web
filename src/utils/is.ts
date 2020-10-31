


export const isFunction = (val: unknown): val is Function => typeof val === 'function';

export const isDef = <T = unknown>(val?: T): val is T => {
  return typeof val !== 'undefined';
};

export const isUnDef = <T = unknown>(val?: T): val is T => {
  return !isDef(val);
};

export function isNull(val: unknown): val is null {
  return val === null;
}