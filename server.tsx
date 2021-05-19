import { Dero, HttpRequest, HttpResponse, staticFiles } from "./deps/deps-server.ts";
import MovieController from './server/apps/MovieController.tsx';
import { browserPath, cors, react } from './server/helpers/wares.ts';
import { parse } from 'https://deno.land/std/flags/mod.ts';

const { files } = await Deno.emit(
    "./client.tsx",
    {
        check: false,
        bundle: "esm",
        compilerOptions: {
            lib: ["dom", "dom.iterable", "esnext"],
        },
    },
);

class App extends Dero {
    constructor() {
        super();
        this.use(cors, react);
        this.get(browserPath, (req, res) => {
            const js = files["deno:///bundle.js"];
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

const DEFAULT_PORT = 8000;
const argPort = parse(Deno.args).port;

await new App().listen(argPort ? Number(argPort) : DEFAULT_PORT);