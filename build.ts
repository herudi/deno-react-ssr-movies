import { parse, print } from "https://x.nest.land/swc@0.0.6/mod.ts";

console.log("Building client js .....");

const { files } = await Deno.emit(
    "./client.tsx",
    {
        bundle: "esm",
        compilerOptions: {
            lib: ["dom", "dom.iterable", "esnext"],
        }
    },
);

const parseFile = parse(files["deno:///bundle.js"], {
    syntax: "ecmascript"
});

let code = print(parseFile, { minify: true }).code;

await Deno.writeTextFile("./public/client.min.js", code);
console.log("Success");

Deno.exit(1);