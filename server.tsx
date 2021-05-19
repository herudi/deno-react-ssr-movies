import { Dero, HttpRequest, HttpResponse, staticFiles, parseFlag } from "./deps/deps-server.ts";
import MovieController from './server/apps/MovieController.tsx';
import { browserPath, cors, react } from './server/helpers/wares.ts';

const env = parseFlag(Deno.args);
const DENO_ENV = env.deno_env || "development";
const DEFAULT_PORT = 3000;
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
        this.use(cors, react);
        this.get(browserPath, async (req, res) => {
            let js = "";
            if (emit) js = emit.files["deno:///bundle.js"]; 
            else js = await Deno.readTextFile("./public/client.min.js");
            res.type("application/javascript").body(js);
        });
        this.use("/assets", staticFiles("public", { etag: false }));
        this.use({ class: [MovieController] });
        this.use((err: any, req: HttpRequest, res: HttpResponse) => {
            let code = err.status || 500;
            if (typeof code !== "number") code = 500;
            return res.status(code).body({
                statusCode: code,
                message: err.message || 'Unknown Error'
            });
        });
    }
}

await new App().listen(env.port ? Number(env.port) : DEFAULT_PORT);