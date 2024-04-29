# @badrap/material-symbols-omnibus

> [!NOTE]
> Importing this package pulls in data for _all_ Material Symbol icons. You're probably better off using something like [marella/material-symbols](https://github.com/marella/material-symbols).

A React component to render [Material Symbol icons](https://fonts.google.com/icons) as SVG.

The icons are the outlined variant with the 48px optical size. The icon can either be unfilled or filled.

## Installation

```sh
npm i @badrap/material-symbols-omnibus
```

## Usage

```ts
import { MaterialSymbol } from "@badrap/material-symbols-omnibus";

// Render the Account Circle icon, with an optional className.
<MaterialSymbol name="account_circle" className="symbol" />

// Render the filled variant of the Account Circle icon.
<MaterialSymbol name="account_circle" filled />

// Render a fallback if the given icon name does not exist.
<MaterialSymbol name="no_such_symbol" fallback={<div>no such symbol</div>} />
```

## License

Material Symbols are available under the Apache License Version 2.0. Therefore this package is also available under the same license.
