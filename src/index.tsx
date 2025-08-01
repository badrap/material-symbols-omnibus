import { data } from "./_data.js";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export type MaterialSymbolInfo = {
  height: number;
  width: number;
  viewBox: string;
  path: string;
};

export function resolveMaterialSymbol(
  name: string,
): MaterialSymbolInfo | undefined {
  const path = Object.hasOwn(data, name)
    ? data[name as keyof typeof data]
    : undefined;
  if (path === undefined || !hasOwnProperty.call(data, name)) {
    return undefined;
  }
  return { height: 24, width: 24, viewBox: "0 -960 960 960", path };
}
