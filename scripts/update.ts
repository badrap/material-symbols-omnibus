import * as v from "@badrap/valita";

async function fetchSymbolNames() {
  const res = await fetch(
    "https://fonts.google.com/metadata/icons?key=material_symbols&incomplete=true",
  );
  if (!res.ok) {
    throw new Error(`failed to fetch metadata with status code ${res.status}`);
  }

  const text = await res.text();
  const index = text.indexOf("{");
  if (index === -1) {
    throw new Error("unexpected metadata");
  }

  const json = JSON.parse(text.slice(index));
  const data = v
    .object({
      icons: v.array(
        v.object({
          name: v.string(),
          unsupported_families: v.array(v.string()),
        }),
      ),
    })
    .parse(json, { mode: "strip" });

  const symbols = data.icons
    .filter(
      (d) => !d.unsupported_families.includes("Material Symbols Outlined"),
    )
    .map((d) => d.name);
  return symbols;
}

const SVG_REX =
  /^<svg .*? height="48" viewBox="0 -960 960 960" width="48"><path d="([^"]*)"\/><\/svg>$/;

async function fetchSymbolSvg(name: string, fill: boolean) {
  const slug = encodeURIComponent(name);
  const variant = fill ? "fill1" : "default";
  const url = `https://fonts.gstatic.com/s/i/short-term/release/materialsymbolsoutlined/${slug}/${variant}/48px.svg`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `failed to fetch symbol '${name}' SVG with status code ${res.status}`,
    );
  }

  const svg = await res.text();
  const match = SVG_REX.exec(svg);
  if (!match) {
    throw new Error(`unexpected SVG data for symbol '${name}'`);
  }
  return match[1] as string;
}

async function worker(
  names: Iterable<string>,
  output: Record<string, [string, string]>,
) {
  for (const name of names) {
    const fill0 = await fetchSymbolSvg(name, false);
    const fill1 = await fetchSymbolSvg(name, true);
    output[name] = [fill0, fill1];
  }
}

async function main(concurrency = 15) {
  const symbols = await fetchSymbolNames();

  const output: Record<string, [string, string]> = {};
  const names = symbols[Symbol.iterator]();
  const workers = [];
  for (let i = 0; i < concurrency; i++) {
    workers.push(worker(names, output));
  }
  await Promise.all(workers);

  const sorted = Object.fromEntries(
    Object.keys(output)
      .sort()
      .map((key) => [key, output[key]]),
  );
  console.log(JSON.stringify(sorted));
}

void main();
