import { Dero, staticFiles, parseFlag } from "./deps/deps-server.ts";
import { browserPath, react } from './server/helpers/wares.ts';
import MovieController from './server/apps/MovieController.tsx';

const env = parseFlag(Deno.args);
const DENO_ENV = env.deno_env || "development";
const DEFAULT_PORT = 3000;
const template = await Deno.readTextFile("./public/template.html");
let emit = void 0 as any;

if (DENO_ENV !== 'production') {
    emit = await Deno.emit(
        "./client.tsx",
        {
            check: false,
            bundle: "esm",
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
        this.get(browserPath, async (_, res) =>
            res.type("application/javascript").body(
                emit ?
                    emit.files["deno:///bundle.js"] :
                    await Deno.readTextFile("./public/client.min.js")
            )
        );
        this.use("/assets", staticFiles("public"));
        this.use({ class: [MovieController] });
    }
}

await new App().listen(env.port ? Number(env.port) : DEFAULT_PORT);