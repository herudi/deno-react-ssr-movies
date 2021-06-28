import { Dero, staticFiles } from "./deps/deps-server.ts";
import { react } from './server/helpers/wares.ts';
import MovieController from './server/apps/MovieController.tsx';

const template = await Deno.readTextFile("./public/template.html");

export class Server extends Dero {
    
    async prepare(type: string){
        let emit = void 0 as any;
        if (type === 'local') {
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
        const BROWSER_PATH = type === 'local' ? '/development.js' : '/assets/bundle.js';
        this.use(react(template, BROWSER_PATH));
        this.use("/assets", staticFiles("public"));
        if (emit) this.get(BROWSER_PATH, (_, res) => res.type("application/javascript").body(emit.files["deno:///bundle.js"]));
        this.use({ class: [MovieController] });
        return this;
    }
}

const server = new Server();
await server.prepare('deploy');
server.deploy()