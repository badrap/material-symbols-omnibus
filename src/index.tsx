import React from "react";
import data from "../data/symbols.json";

type MaterialSymbolProps = {
  name: string;
  filled?: boolean;
  fallback?: React.ReactNode;
  className?: string;
};

const hasOwnProperty = Object.prototype.hasOwnProperty;

export function MaterialSymbol(props: MaterialSymbolProps): React.ReactNode {
  const { name, filled, fallback, className } = props;
  if (!hasOwnProperty.call(data, name)) {
    return fallback;
  }
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      height="48"
      width="48"
      fill="currentColor"
      viewBox="0 -960 960 960"
    >
      <path d={data[name as keyof typeof data][filled ? 1 : 0]} />
    </svg>
  );
}
