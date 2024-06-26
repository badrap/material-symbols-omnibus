# @badrap/material-symbols-omnibus

> [!NOTE]
> Importing this package pulls in data for _all_ Material Symbol icons. You're probably better off using something like [marella/material-symbols](https://github.com/marella/material-symbols).

A library to resolve a [Material Symbol icons](https://fonts.google.com/icons) name to an SVG path.

The icons are the outlined variant with the 20px optical size. Both the filled and outlined versions are available.

## Installation

```sh
npm i @badrap/material-symbols-omnibus
```

## Usage

```tsx
import { resolveMaterialSymbol } from "@badrap/material-symbols-omnibus";

export function MaterialSymbol(props: { name: string }) {
  const data = resolveMaterialSymbol(props.name);
  if (!data) {
    return null;
  }
  return (
    <svg width={data.width} height={data.height} viewBox={data.viewBox}>
      <path d={data.path} />
    </svg>
  );
}
```

## License

Material Symbols are available under the Apache License Version 2.0. Therefore this package is also available under the same license.
