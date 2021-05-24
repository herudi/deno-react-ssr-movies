import { Bundler } from "https://deno.land/x/bundler@0.7.1/bundler.ts";
import { createDefaultPlugins } from "https://deno.land/x/bundler@0.7.1/defaults.ts";
import { BUILD_DEV, BUILD_PROD } from './build/template.ts';

console.log("Bundling client js .....");
await Deno.writeTextFile("./deps/deps-client.ts", BUILD_PROD);
const { files } = await Deno.emit(
    "./client.tsx",
    {
        bundle: "module",
        compilerOptions: {
            lib: ["dom", "dom.iterable", "esnext"],
        }
    },
);

await Deno.writeTextFile("./build.js", files["deno:///bundle.js"]);

console.log("Optimize client js .....");

const plugins = createDefaultPlugins();
const bundler = new Bundler(plugins);

let bundles: Record<string, any> = {};

async function bundle() {
    const { bundles: newBundles } = await bundler.bundle(["build.js"], { optimize: true });
    bundles = { ...bundles, ...newBundles };
}

await bundle();

if (Object.keys(bundles).length) {
    let _code = bundles[Object.keys(bundles)[0]];
    await Deno.writeTextFile("./public/bundle.js", _code);
    await Deno.remove("./build.js");
    console.log("Success");
} else {
    console.error("Something went wrong...");
}

await Deno.writeTextFile("./deps/deps-client.ts", BUILD_DEV);