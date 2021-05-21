import { Dero, staticFiles } from "./deps/deps-server.ts";
import { react } from './server/helpers/wares.ts';
import MovieController from './server/apps/MovieController.tsx';
import { BROWSER_PATH, PORT, DENO_ENV } from './constant.ts';

const template = await Deno.readTextFile("./public/template.html");
let emit = void 0 as any;

if (DENO_ENV !== 'production') {
    emit = await Deno.emit(
        "./client.tsx",
        {
            check: false,
            bundle: "module",
            compilerOptions: {
                lib: ["dom", "dom.iterable", "esnext"],
            }
        },
    );
}

class App extends Dero {
    constructor() {
        super();
        this.use(react(template));
        this.use("/assets", staticFiles("public"));
        if (emit) this.get(BROWSER_PATH, (_, res) => res.type("application/javascript").body(emit.files["deno:///bundle.js"]));
        this.use({ class: [MovieController] });
    }
}

await new App().listen(PORT, (err, opts) => {
    if (err) console.log(err);
    console.log("> Running on port " + opts?.port);
});