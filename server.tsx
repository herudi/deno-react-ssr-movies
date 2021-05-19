import { Dero, staticFiles, parseFlag } from "./deps/deps-server.ts";
import MovieController from './server/apps/MovieController.tsx';
import { browserPath, cors, react } from './server/helpers/wares.ts';

const env = parseFlag(Deno.args);
const DENO_ENV = env.deno_env || "development";
const DEFAULT_PORT = 3000;
let jsClient = "";

if (DENO_ENV === 'production') {
    jsClient = await Deno.readTextFile("./public/client.min.js");
} else {
    const { files } = await Deno.emit(
        "./client.tsx",
        {
            check: false,
            bundle: "esm",
            compilerOptions: {
                lib: ["dom", "dom.iterable", "esnext"],
            }
        },
    );
    jsClient = files["deno:///bundle.js"];
}

class App extends Dero {
    constructor() {
        super();
        this.use(cors, react);
        this.get(browserPath, (_, res) => res.type("application/javascript").body(jsClient));
        this.use("/assets", staticFiles("public", { etag: false }));
        this.use({ class: [MovieController] });
    }
}

await new App().listen(env.port ? Number(env.port) : DEFAULT_PORT);