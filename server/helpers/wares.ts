import { NextFunction, HttpResponse, HttpRequest, ReactDOMServer } from "../../deps/deps-server.ts";
import { React } from "../../deps/deps-client.ts";

export const browserPath = '/client.js';

export function cors(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', '*');
    res.header('Access-Control-Allow-Headers', '*');
    next();
}

export async function react(req: HttpRequest, res: HttpResponse, next: NextFunction) {
    let template = await Deno.readTextFile(`${Deno.cwd()}/public/template.html`);
    res.return.push((Elem) => {
        if (React.isValidElement(Elem)) {
            res.type("text/html");
            const content = (ReactDOMServer as any).renderToString(Elem);
            return template
                .replace("{{title}}", res.locals.seo?.title || 'Home')
                .replace("{{description}}", res.locals.seo?.desc || 'None')
                .replace("{{content}}", content)
                .replace("{{client_script}}", `<script src="${browserPath}" defer></script>`)
                .replace("{{window_script}}", `<script>window.__INITIAL_DATA__ = ${JSON.stringify(res.locals)}; window.BASE_URL = "${req.getBaseUrl()}";</script>`);
        }
        return;
    });
    next();
}