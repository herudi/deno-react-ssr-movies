import { parse, print } from "https://x.nest.land/swc@0.0.6/mod.ts";

const { files } = await Deno.emit(
    "./client.tsx",
    {
        bundle: "esm",
        compilerOptions: {
            lib: ["dom", "dom.iterable", "esnext"],
        }
    },
);

const par = parse(files["deno:///bundle.js"], {
    syntax: "ecmascript"
});

let code = print(par, {
    minify: true
}).code;

await Deno.writeTextFile("./public/client.min.js", code);
console.log("Success");

Deno.exit(1);