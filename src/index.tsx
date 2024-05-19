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
  const path = name as keyof typeof data;
  if (typeof path === "undefined" || !hasOwnProperty.call(data, name)) {
    return undefined;
  }
  return { height: 20, width: 20, viewBox: "0 -960 960 960", path };
}
