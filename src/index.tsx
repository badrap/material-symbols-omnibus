import React from "react";
import data from "../data/symbols.json";

const hasOwnProperty = Object.prototype.hasOwnProperty;

export type MaterialSymbolInfo = {
  height: number;
  width: number;
  viewBox: [number, number, number, number];
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
    viewBox: [0, -960, 960, 960],
    path: data[name as keyof typeof data][filled ? 1 : 0]!,
  };
}

export type MaterialSymbolProps = {
  name: string;
  filled?: boolean;
  fallback?: React.ReactNode;
  className?: string;
};

export function MaterialSymbol(props: MaterialSymbolProps): React.ReactNode {
  const { fallback, className } = props;
  const resolved = resolveMaterialSymbol(props);
  if (!resolved) {
    return fallback;
  }
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height={resolved.height}
      width={resolved.width}
      viewBox={resolved.viewBox.join("")}
      fill="currentColor"
    >
      <path d={resolved.path} />
    </svg>
  );
}
