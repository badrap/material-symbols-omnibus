import { data } from "./_data.js";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export type MaterialSymbolInfo = {
  height: number;
  width: number;
  viewBox: string;
  path: string;
};

export function resolveMaterialSymbol(props: {
  name: string;
  filled?: boolean;
}): MaterialSymbolInfo | undefined {
  const { name, filled } = props;
  if (!hasOwnProperty.call(data, name)) {
    return undefined;
  }
  return {
    height: 48,
    width: 48,
    viewBox: "0 -960 960 960",
    path: data[name as keyof typeof data][filled ? 1 : 0]!,
  };
}
